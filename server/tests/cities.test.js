import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('*************** Test fo view all cities ***************', () => {
    it('should show all cities supported by Barefoot Nomad', done => {
        const token = process.env.PASSING_TOKEN;
      chai
        .request(app)
        .get('/api/v1/trips/cities')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('All cities supported by Barefoot Nomad');
          done();
        });
    });
});
