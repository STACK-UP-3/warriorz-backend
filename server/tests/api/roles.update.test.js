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

describe('*** Testing Roles API - UPDATE a single role \n', () => {
  let queryResult = null;

  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    // Insert test Roles into database storage
    queryResult = await RoleService.createRole({
      name: 'Unique Role',
      permissions: 'create-trip,edit-trip',
    });

    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
  
  });
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Role exists, and User has correct permissions
  it('should update an existing Role', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/roles/${queryResult.dataValues.id}`)
      .set('Authorization', testTokens.superAdmin)
      .send({ name: 'Updated Role' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Role updated successfully');
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/roles/${queryResult.dataValues.id}`)
      .send({ name: 'Updated Role' })
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

  // User must have valid authorisation to PATCH an existing Role
  it('should return error for invalid User role/permissions', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/roles/${queryResult.dataValues.id}`)
      .set('Authorization', testTokens.requester)
      .send({ name: 'Updated Role' })
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

  // Role must exist in order to be updated
  it('should return error on non-existent Role', (done) => {
    chai
      .request(app)
      .patch('/api/v1/roles/800')
      .set('Authorization', testTokens.superAdmin)
      .send({ name: 'Updated Role' })
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

  // Role missing name
  it('should return error on missing Role name', (done) => {
    chai
      .request(app)
      .patch('/api/v1/roles/1')
      .set('Authorization', testTokens.superAdmin)
      .send({
        name: '',
        permissions: testRoles.valid.permissions,
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('name is not allowed to be empty');
        done();
      });
  });
});
