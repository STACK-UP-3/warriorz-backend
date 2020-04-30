import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';
import UserService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;

describe('*** Testing Roles API: READ all roles \n', () => {
  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
  });
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Role exists, and User has correct permissions
  it('should return all existing Roles', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles')
      .set('Authorization', testTokens.superAdmin)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Roles retrieved successfully');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles')
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

  // User must have valid authorisation to GET existing Roles
  it('should return error for invalid User role', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles')
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
});
