import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import UserService from '../../services/userService';
import { testTokens } from '../data/auth.tokens.sample';

chai.use(chaiHttp);
const { expect } = chai;

describe('\n Testing Roles API: READ all roles \n', () => {
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

  // Resource exists, and User has correct permissions
  it('should return all existing Users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .set('Authorization', testTokens.superAdmin)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Users retrieved successfully');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
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

  // User must have valid authorisation to GET existing Users
  it('should return error for invalid User role', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
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
