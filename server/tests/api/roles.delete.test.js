import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';

chai.use(chaiHttp);
const { expect } = chai;

describe('*** Testing Roles API: DELETE role \n', () => {
  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {});
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Role exists, and User has correct permissions
  it('should delete an existing Role', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles/6')
      .set('Authorization', testTokens.superAdmin)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Role deleted successfully');
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles/1')
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

  // User must have valid authorisation to DELETE a Role
  it('should return error for invalid User role', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles/1')
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

  // Role must be existing before it can be deleted
  it('should return error on non-existent Role', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles/10')
      .set('Authorization', testTokens.superAdmin)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('Role with id 10 does not exist');
        done();
      });
  });
});
