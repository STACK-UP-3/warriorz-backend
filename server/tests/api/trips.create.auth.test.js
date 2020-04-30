import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';
import trip from '../fixtures/tripData';

import { testTokens } from '../data/auth.tokens.sample';
import UserService from '../../services/userService';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('===== Test for authorization of the user \n', () => {

  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  it('should pass through with Authorised access', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[0])
      .end((err, res) => {   
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'A one-way-trip was registered successfully.',
        );
        done();
      });
  });

  it('should not pass through: Because No token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(trip[0])
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

  it('should not pass through: Because You have to login to Proceed', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.invalidRole)
      .send(trip[1])
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });


  it('should not pass through: Because The user  does not have a manager.', (done) => {
    // const token = process.env.UN_VERIFIED_TOKEN;
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.manager)
      .send(trip[1])
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  // User must have valid authorisation to POST a new Trip
  it('should return error for invalid User role', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(trip[0])
      .set('Authorization', testTokens.superAdmin)
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
