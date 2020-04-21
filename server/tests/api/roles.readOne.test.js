import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testRoles } from '../data/api.roles.sample';
import { testTokens } from '../data/auth.tokens.sample';
import RoleService from '../../services/RoleService';
import UserService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;

describe('*** Testing Roles API - READ a single role \n', () => {
  const queryResult = [];

  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    // Insert test Roles into database storage
    queryResult[0] = await RoleService.createRole(testRoles.valid);
    queryResult[1] = await RoleService.createRole({
      name: 'Role 2',
      permissions: 'update-role',
    });
    
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
  });
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Role exists, and User has correct permissions
  it('should return an existing Role', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles/1')
      .set('Authorization', testTokens.superAdmin)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Role retrieved successfully');
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('No token provided or Token expired');
        done();
      });
  });

  // User must have valid authorisation to GET an existing Role
  it('should return error for invalid User role/permissions', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles/1')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('Forbidden route: Dear user you are not allowed to carry out this activity.');
        done();
      });
  });

  // Role must exist in order to be retrieved
  it('should return error on non-existent Role', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles/800')
      .set('Authorization', testTokens.superAdmin)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('Role with id 800 does not exist');
        done();
      });
  });
});
