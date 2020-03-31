/* eslint-disable import/no-extraneous-dependencies */
// import regeneratorRuntime from 'regenerator-runtime';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('~~~ Testing Route (User Sign-In): POST /api/v1/users/signin ~~~', () => {
  // User exists, and is verified
  it('should authenticate an existing verified user', (done) => {
    const user = {
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'test',
      bio: 'I am an example user account. Thank you.',
    };

    // First register a sample user
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        // Verify users manually
        const token = process.env.SIGNUP_TEST_TOKEN;
        chai
          .request(app)
          .get(`/api/v1/users/verify/${token}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            // Then test authentication of sample user
            chai
              .request(app)
              .post('/api/v1/users/signin')
              .send(user)
              .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
              });
          });
      });
  });

  // User not verified
  it('should return error for un-verified user', (done) => {
    const user = {
      firstname: 'Unverified',
      lastname: 'User',
      email: 'unverified@example.com',
      password: 'unverified',
      bio: 'This is a test user who has an unverified account',
    };
    // First register a sample user
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        // Then test authentication of sample user
        chai
          .request(app)
          .post('/api/v1/users/signin')
          .send(user)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
          });
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
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
