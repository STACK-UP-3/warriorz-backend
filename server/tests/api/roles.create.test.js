import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';

chai.use(chaiHttp);

describe('*** Testing Roles API: POST new role \n', () => {
  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {});
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Role exists, and User has correct permissions
  it('should create a new Role', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set('Authorization', testTokens.superAdmin)
      .send({
        name: 'Test Role',
        permissions: 'test-permission',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('permissions');

        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Role created successfully');
        expect(res.body.data).to.eql({
          name: 'Test Role',
          permissions: 'test-permission',
        });
        done();
      });
  });

  // Request must provide an access token
  it('should return error on missing access token', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .send({
        name: 'Test Role',
        permissions: 'test-permission',
      })
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

  // User must have valid authorisation to POST a new Role
  it('should return error for invalid User role', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set('Authorization', testTokens.invalidRole)
      .send({
        name: 'Test Role',
        permissions: 'test-permission',
      })
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

  // Role name must be provided
  it('should return error on missing Role name', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set('Authorization', testTokens.superAdmin)
      .send({
        name: '',
        permissions: 'random-permission',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('name is not allowed to be empty');
        done();
      });
  });

  // Role must have a unique name
  it('should return error if Role name is not unique', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set('Authorization', testTokens.superAdmin)
      .send({
        name: 'Test Role',
        permissions: 'random-permission,other-permission',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(409);
        expect(res.body.message).to.equal(
          "Role with name 'Test Role' already exists",
        );
        done();
      });
  });
});
