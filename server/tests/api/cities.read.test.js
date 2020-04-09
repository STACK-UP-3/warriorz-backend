import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';

chai.should();
chai.use(chaiHttp);

describe('*** Testing Cities API: READ all cities \n', () => {
  it('should show all cities supported by Barefoot Nomad', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/cities')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All cities supported by Barefoot Nomad',
        );
        done();
      });
  });

  // User must have valid authorisation to GET existing Cities
  it('should return error for invalid User role', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/cities')
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
