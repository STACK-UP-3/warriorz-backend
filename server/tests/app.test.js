import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import newUser from './fixtures/signupData';

chai.should();
chai.use(chaiHttp);

describe('>>> Testing Starter Routes', () => {
  it('should return welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal(
          'Welcome to Barefoot Nomad (Warriorz) app.',
        );
        done();
      });
  });

  it('Incorrect route', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signupuududud')
      .send(newUser[0])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
