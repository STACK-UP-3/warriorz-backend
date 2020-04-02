import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import { encode } from '../helpers/resetEncode';
import userService from '../services/userService';

chai.should();
chai.use(chaiHttp);

const user = {
  firstname: 'Francis',
  lastname: 'Magic',
  email: 'mfrancois.dev@gmail.com',
  password: 'mypassword',
  isVerified: true,
};

let token;

before((done) => {
  userService.createuser(user);
  token = encode({ email: user.email });
  user.email = 'francoismugorozi@gmail.com';
  user.isVerified = false;
  userService.createuser(user);
  user.email = 'francoismugorozi@yahoo.com';
  user.isVerified = true;
  userService.createuser(user);
  done();
});

describe('test reset password', () => {
  it('should return no user found with email', (done) => {
    user.email = 'nouser@gmail.com';
    chai
      .request(app)
      .post('/api/v1/password/forgot')
      .send({ email: user.email })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return not found email', (done) => {
    user.email = 'nouser@gmail.com';
    chai
      .request(app)
      .post('/api/v1/password/forgot')
      .send({ email: user.email })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return invalid email', (done) => {
    user.email = 'nousergmail.com';
    chai
      .request(app)
      .post('/api/v1/password/forgot')
      .send({ email: user.email })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return account not verified', (done) => {
    chai
      .request(app)
      .post('/api/v1/password/forgot')
      .send({ email: 'francoismugorozi@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should send link to user email', (done) => {
    chai
      .request(app)
      .post('/api/v1/password/forgot')
      .send({ email: 'mfrancois.dev@gmail.com' })
      .end((err, res) => {
        token = encode({ email: 'mfrancois.dev@gmail.com' });
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return invalid token', (done) => {
    const invToken = encode({ mail: 'user@mail' });
    user.email = 'mfrancois.dev@gmail.com';
    chai
      .request(app)
      .patch(`/api/v1/password/reset/${invToken}/`)
      .send({ password: 'user.password' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return invalid password', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/password/reset/${token}/`)
      .send({ password: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return no email found', (done) => {
    const invToken = encode({ email: '' });
    chai
      .request(app)
      .patch(`/api/v1/password/reset/${invToken}`)
      .send({ password: 'user.password' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return account not verified', (done) => {
    const noVerifiedToken = encode({ email: 'francoismugorozi@gmail.com' });
    chai
      .request(app)
      .patch(`/api/v1/password/reset/${noVerifiedToken}`)
      .send({ password: 'francoismugorozi' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return user not found', (done) => {
    const noVerifiedToken = encode({ email: 'francoismugoroz@gmail.com' });
    chai
      .request(app)
      .patch(`/api/v1/password/reset/${noVerifiedToken}`)
      .send({ password: 'francoismugorozi' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should reset user password', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/password/reset/${token}`)
      .send({ password: 'userpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
