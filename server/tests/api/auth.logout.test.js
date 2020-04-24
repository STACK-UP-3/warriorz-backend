import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';

import { testUsers } from '../data/api.users.sample';
import { testTokens } from '../data/auth.tokens.sample';
import { encode } from '../../helpers/resetEncode';
import userService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;

describe('>>> Testing Auth API: POST user logout \n', () => {
  // Define useful variables
  const tokens = {};

  //
  // Hooks ... https://mochajs.org/#hooks
  //

  before(async () => {
    // Hash passwords
    testUsers.validForLogout.password = await bcrypt.hash(
      testUsers.validForLogout.passwordPlain,
      10,
    );
    testUsers.tokenless.password = await bcrypt.hash(
      testUsers.tokenless.passwordPlain,
      10,
    );

    // Create valid User for testing logout API
    const queryResult = await userService.createuser(testUsers.validForLogout);
    // Generate valid token for valid User
    tokens.valid = encode({
      id: queryResult.dataValues.id,
      fullName: `${queryResult.dataValues.firstname} ${queryResult.dataValues.lastname}`,
      email: queryResult.dataValues.email,
      role: queryResult.dataValues.role,
    });
    // Sign in valid User by setting their token in storage
    await userService.updateAtt(
      { token: tokens.valid },
      { id: queryResult.dataValues.id },
    );

    // Create a sample user (with no access token)
    const queryResultTokenless = await userService.createuser(
      testUsers.tokenless,
    );
    tokens.tokenless = encode({
      id: queryResultTokenless.dataValues.id,
      fullName: `${queryResultTokenless.dataValues.firstname} ${queryResultTokenless.dataValues.lastname}`,
      email: queryResultTokenless.dataValues.email,
      role: queryResultTokenless.dataValues.role,
    });

    // Create a sample user (with mismatched access token)
    const queryResultMismatch = await userService.createuser(
      testUsers.mistoken,
    );
    tokens.mismatched = encode({
      id: queryResultMismatch.dataValues.id,
      fullName: `${queryResultMismatch.dataValues.firstname} ${queryResultMismatch.dataValues.lastname}`,
      email: queryResultMismatch.dataValues.email,
      role: queryResultMismatch.dataValues.role,
    });
    // Sign in valid User by setting their token in storage
    await userService.updateAtt(
      { token: tokens.mismatched },
      { id: queryResultMismatch.dataValues.id },
    );
    // Set mismatched token with valid User email
    tokens.mistoken = encode({
      id: queryResultMismatch.dataValues.id,
      fullName: `${queryResultMismatch.dataValues.firstname}`,
      email: queryResultMismatch.dataValues.email,
      role: queryResultMismatch.dataValues.role,
    });
  });
  after(() => {});

  //
  // Test Cases ...
  //

  // User exists, is signed in
  it('should sign out an existing user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', tokens.valid)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('You have logged out successfully');
        done();
      });
  });

  // No token provided in the request
  it('should return error for missing token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/logout')
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('Token not provided');
        done();
      });
  });

  // User wrong token, missing email
  it('should return error for missing email in token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', testTokens.random)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('Token is invalid: Missing email');
        done();
      });
  });

  // User no record
  it('should return error for non-existent user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', testTokens.logout.noUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
  });

  // User no token saved, not signed in
  it('should return error for missing token in user record', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', tokens.tokenless)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal(
          'User has no token: Please sign in first',
        );
        done();
      });
  });

  // Token mismatch
  it('should return error for mismatched token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', tokens.mistoken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('Token is invalid');
        done();
      });
  });
});
