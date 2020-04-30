import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import UserService from '../../services/userService';

import { testTokens } from '../data/auth.tokens.sample';

chai.should();
chai.use(chaiHttp);

before(async () => {
  await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
  await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
  await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
});
after(async () => {});

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
      .set('Authorization', testTokens.superAdmin)
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
