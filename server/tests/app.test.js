import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import newUser from './testData/signup.testData';

chai.should();
chai.use(chaiHttp);

describe('Route test', () => {
  it('Incorrect route', done => {
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
