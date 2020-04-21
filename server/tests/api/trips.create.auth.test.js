import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../../app';
import trip from '../fixtures/tripData';

import { testTokens } from '../data/auth.tokens.sample';
import UserService from '../../services/userService';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('===== Test for authorization of the user \n', () => {
  let tokenWithManager = null;
  let tokenNoManager = null;

  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    // Get user with a line manager
    const userWithManager = await UserService.findByEmail({
      email: 'firaduk@yahoo.com',
    });
    // Encode token for the user
    tokenWithManager = jwt.sign(
      userWithManager.dataValues,
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      },
    );
    // Save token to user record
    await UserService.updateAtt(
      { token: tokenWithManager },
      { id: userWithManager.dataValues.id },
    );

    // Get user missing a line manager
    const userNoManager = await UserService.findByEmail({
      email: 'ndoliOg@gmail.com',
    });
    // Encode token for the user
    tokenNoManager = jwt.sign(userNoManager.dataValues, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    // Save token to user record
    await UserService.updateAtt(
      { token: tokenNoManager },
      { id: userNoManager.dataValues.id },
    );
  });

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  it('should pass through with Authorised access', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', tokenWithManager)
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
        expect(res.statusCode).to.equal(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('Token must be provided');
        done();
      });
  });

  // it('should not pass through: Because You have to login to Proceed', (done) => {
  //   const token = process.env.NOTFOUND_TOKEN;
  //   chai
  //     .request(app)
  //     .post('/api/v1/trips')
  //     .set('Authorization', token)
  //     .send(trip[1])
  //     .end((err, res) => {
  //       expect(res).to.have.status(401);
  //       done();
  //     });
  // });

  // it('should not pass through: Because No token provided or Token expired with error name: JsonWebTokenError', (done) => {
  //   const token = process.env.NOTFOUND2_TOKEN;
  //   chai
  //     .request(app)
  //     .post('/api/v1/trips')
  //     .set('Authorization', token)
  //     .send(trip[1])
  //     .end((err, res) => {
  //       expect(res).to.have.status(404);
  //       done();
  //     });
  // });

  it('should not pass through: Because The user  does not have a manager.', (done) => {
    // const token = process.env.UN_VERIFIED_TOKEN;
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', tokenNoManager)
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
      .set('Authorization', testTokens.invalidRole)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('Forbidden route');
        done();
      });
  });
});
