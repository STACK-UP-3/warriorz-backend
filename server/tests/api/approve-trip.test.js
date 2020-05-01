import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';
import userService from '../../services/userService';
import { testTokens } from '../data/auth.tokens.sample';
import reqService from '../../services/tripReqService';

chai.should();
chai.use(chaiHttp);

describe('=====test patch route /api/v1/trips/requests - Approve/Reject trip request ======', () => {
  let requestId;
  before(async () => {
    await userService.updateAtt(
      { token: testTokens.requester },
      { email: 'firaduk@yahoo.com' },
    );
    await userService.updateAtt(
      { token: testTokens.manager },
      { email: 'ndoliOg@gmail.com' },
    );
    const tripRequest = await reqService.createTripReq({
      trip_id: 20,
      user_id: 1,
      line_manager_id: 2,
      status: 'Pending',
    });
    requestId = tripRequest.id;
  });

  it('Should return 401 status code when token is not provided or expired', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/requests')
      .set('authorization', 'notoken')
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('No token provided or Token expired');
        done();
      });
  });

  it('Should return 401 status code when token is not provided', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/requests')
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('No token provided or Token expired');
        done();
      });
  });

  it('Should return 400 status code when special character are used', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/requests/1')
      .set('authorization', testTokens.manager)
      .send({
        status: '@$##%@%',
      })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 400 status code when not requestId or staus given', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/requests/hj')
      .set('authorization', testTokens.manager)
      .send({})
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 403 status code when user do not have permisson', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/requests/1')
      .set('authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.body).to.have.status(403);
        expect(res.type).to.equal('application/json');
        expect(res.body)
          .to.have.property('message')
          .to.equal(
            'Forbidden route: Dear user you are not allowed to carry out this activity.',
          );
        done();
      });
  });

  it('Should return 404 status code when trip request not found for manager', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/requests/0')
      .set('authorization', testTokens.manager)
      .send({ status: 'Approved' })
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body)
          .to.have.property('message')
          .to.equal(`Trip request 0 for you not found`);
        done();
      });
  });

  it('Should return 200 status code when trip request status changed successfuly', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/requests/${requestId}`)
      .set('authorization', testTokens.manager)
      .send({ status: 'Approved' })
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(`Trip request Approved successfully`);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
