import 'dotenv/config';
import bcrypt from 'bcrypt';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';
import { testUsers } from '../data/api.users.sample';
import UserService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;

describe("\n Testing Users API - UPDATE a User's role \n", () => {
  let queryResult = null;
  // let updateQueryResult = null;
  const testUser = testUsers.basic;

  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    // Hash password
    testUser.password = await bcrypt.hash(testUser.passwordPlain, 10);
    // Insert a test User into database storage
    queryResult = await UserService.createuser(testUser);
    // signing in the super admin.
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });

  });
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Resource exists, and User has correct permissions
  it('should update an existing User role', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/users/${queryResult.dataValues.id}`)
      .set('Authorization', testTokens.superAdmin)
      .send({ role: 'Manager' })
      .end((err, res) => {
        expect(res.body.message).to.equal("User's role updated successfully");
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal("User's role updated successfully");
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/users/${queryResult.dataValues.id}`)
      .send({ role: 'Manager' })
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

  // User must have valid authorisation to PATCH an existing User
  it('should return error for invalid User role/permissions', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/users/${queryResult.dataValues.id}`)
      .set('Authorization', testTokens.requester)
      .send({ role: 'Manager' })
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

  // Resource does not exist
  it('should return error on non-existent User', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/800')
      .set('Authorization', testTokens.superAdmin)
      .send({ role: 'Manager' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('User with id 800 does not exist');
        done();
      });
  });
});
