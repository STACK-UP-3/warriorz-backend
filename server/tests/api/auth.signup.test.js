import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';
import newUser from '../fixtures/signupData';

chai.should();
chai.use(chaiHttp);

describe('test sign up', () => {
  it('should signup user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('email already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[1])
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('email is not allowed to be empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('email must be a valid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('first name must only contain alpha-numeric characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res).to.have.status(400);
        done();
      });
  });
  it('password must be valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[6])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should not signup, id not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(newUser[5])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('User verify account', () => {
  it('account must be verified', (done) => {
    const token = process.env.SIGNUP_TOKEN;
    chai
      .request(app)
      .get(`/api/v1/users/verify/${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('account is already verified', (done) => {
    const token = process.env.SIGNUP_TOKEN;
    chai
      .request(app)
      .get(`/api/v1/users/verify/${token}`)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('Token has been expired', (done) => {
    const expiredToken = process.env.SIGNUP_EXPIRED_TOKEN;
    chai
      .request(app)
      .get(`/api/v1/users/verify/${expiredToken}`)
      .end((err, res) => {
        expect(res).to.have.status(410);
        done();
      });
  });
});
