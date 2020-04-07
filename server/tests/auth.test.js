import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import trip from './fixtures/tripData';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('===== test for authorization of the user =====', () => {

  it('should pass through with Authorised access', done => {
    const token = process.env.PASSING_TOKEN;
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('authorization', token)
      .send(trip[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('A one-way-trip was registered successfully.');
        done();
      });
  });

  it('should not pass through: Because No token provided or Token expired', done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(trip[0])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should not pass through: Because You have to login to Proceed', done => {
    const token = process.env.NOTFOUND_TOKEN;
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', token)
      .send(trip[1])
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should not pass through: Because No token provided or Token expired with error name: JsonWebTokenError', done => {
    const token = process.env.NOTFOUND2_TOKEN;
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', token)
      .send(trip[1])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should not pass through: Because The user  does not have a manager.', done => {
    const token = process.env.UN_VERIFIED_TOKEN;
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', token)
      .send(trip[1])
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
