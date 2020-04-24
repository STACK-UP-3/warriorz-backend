/* eslint-disable import/no-extraneous-dependencies */
// import regeneratorRuntime from 'regenerator-runtime';
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../app';

import userService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;

describe('>>> Testing Route (User Sign-In): POST /api/v1/users/signin \n', () => {
  // Define variables
  const unverifiedUser = {
    firstname: 'Unverified',
    lastname: 'User',
    email: 'unverified@example.com',
    passwordPlain: 'unverified',
    bio: 'This is a test user with an unverified account',
  };
  const verifiedUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    passwordPlain: 'test',
    bio: 'I am an example user account with a verified account',
  };

  let resultVerified = null;

  //
  // Hooks ... https://mochajs.org/#hooks
  //

  before(async () => {
    // Hash passwords
    unverifiedUser.password = await bcrypt.hash(
      unverifiedUser.passwordPlain,
      10,
    );
    verifiedUser.password = await bcrypt.hash(verifiedUser.passwordPlain, 10);

    // Create sample users in database
    await userService.createuser(unverifiedUser);
    resultVerified = await userService.createuser(verifiedUser);

    // Verify a sample user for testing
    await userService.updateAtt(
      { isVerified: true },
      { email: resultVerified.dataValues.email },
    );
  });
  after(() => {});

  //
  // Test Cases ...
  //

  // User exists, and is verified
  it('should authenticate an existing verified user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({ email: verifiedUser.email, password: verifiedUser.passwordPlain })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('access_token');
        expect(res.body.data).to.have.property('user');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('You have signed in successfully');
        // https://medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d
        expect(res.body.data.user).to.includes({
          id: resultVerified.dataValues.id,
          fullName: `${verifiedUser.firstname} ${verifiedUser.lastname}`,
          email: verifiedUser.email,
          role: 'Requester',
        });
        done();
      });
  });

  // User not verified
  it('should return error for un-verified user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: unverifiedUser.email,
        password: unverifiedUser.passwordPlain,
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal(
          `You must be verified to login. To activate your account, click on the verification link sent to your email ${unverifiedUser.email}`,
        );
        done();
      });
  });

  // User does not exist
  it('should return error for non-existent user', (done) => {
    const user = {
      email: 'random@user.example',
      password: 'random',
    };

    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('Incorrect Email or Password');
        done();
      });
  });

  // User missing email
  it('should return error on missing email', (done) => {
    const user = {
      email: '',
      password: 'test',
    };

    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('email is not allowed to be empty');
        done();
      });
  });

  // User missing password
  it('should return error on missing password', (done) => {
    const user = {
      email: 'test@example.com',
      password: '',
    };

    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal(
          'password is not allowed to be empty',
        );
        done();
      });
  });

  // User wrong password
  it('should return error on wrong password', (done) => {
    const user = {
      email: 'test@example.com',
      password: 'testing',
    };

    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('Incorrect Email or Password');
        done();
      });
  });
});
