import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';
import updateData from '../fixtures/updateOpenTripData';

import { testTokens } from '../data/auth.tokens.sample';
import UserService from '../../services/userService';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('===== Test Update Open Trip Request =====', () => {

  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  it('Should update the open one way trip request ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/2')
      .set('Authorization', testTokens.requester)
      .send(updateData[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'The one-way-trip details were successfully updated',
        );
        expect(res.body.data).to.includes({
          // Name: 'IRADUKUNDA Fiacre',
          Email: 'firaduk@yahoo.com',
          From: 'Kigali',
          Destination: 'Nairobi',
          DateOfTravel: '2020-10-20',
          TravelReason: 'Visiting',
          accommodation_id: 1,
        });
        done();
      });
  });

  it('Should update the open return trip request ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/5')
      .set('Authorization', testTokens.requester)
      .send(updateData[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'The return-trip details were successfully updated',
        );
        expect(res.body.data).to.includes({
          // Name: 'IRADUKUNDA Fiacre',
          Email: 'firaduk@yahoo.com',
          From: 'Kigali',
          Destination: 'Nairobi',
          DateOfTravel: '2020-10-20',
          TravelReason: 'Visiting',
          accommodation_id: 1,
        });
        done();
      });
  });

  it('Should not update open trip request: Because TRIP_ID must be an integer', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/xxxx')
      .set('Authorization', testTokens.requester)
      .send(updateData[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('trip_id must be a number');
        done();
      });
  });

  it('Should not update open trip request: Because The trip is not found in the database', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/100')
      .set('Authorization', testTokens.requester)
      .send(updateData[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'This trip is not found in the database.',
        );
        done();
      });
  });

  it('Should not update open trip request: Because Origin City is not supported by Barefoot Nomad', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/3')
      .set('Authorization', testTokens.requester)
      .send(updateData[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('error');
        expect(res.body.message).to.have.property('tip');

        expect(res).to.have.status(404);
        expect(res.body.message.error).to.equal(
          'Origin City is not supported by Barefoot Nomad',
        );
        expect(res.body.message.tip).to.equal(
          'Choose from the cities we have available....',
        );
        done();
      });
  });

  it('Should not update open trip request: Because Destination City is not supported by Barefoot Nomad ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/3')
      .set('Authorization', testTokens.requester)
      .send(updateData[2])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('error');
        expect(res.body.message).to.have.property('tip');

        expect(res).to.have.status(404);
        expect(res.body.message.error).to.equal(
          'Destination City is not supported by Barefoot Nomad',
        );
        expect(res.body.message.tip).to.equal(
          'Choose from the cities we have available....',
        );
        done();
      });
  });

  it('Should not update open trip request: Because The trip does not belong to you', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/3')
      .set('Authorization', testTokens.manager)
      .send(updateData[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(
          'Unauthorised Access: Dear user this trip does not belong to you.',
        );
        done();
      });
  });

  it('Should not update open trip request: Because this is not an open trip request', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/1')
      .set('Authorization', testTokens.manager)
      .send(updateData[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('This is not an open trip request.');
        done();
      });
  });

  it('Should not update open trip request: Because return date can not be less than date of travel comparizon', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/2')
      .set('Authorization', testTokens.requester)
      .send(updateData[5])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
          'Return date can not be less than Travel date',
        );
        done();
      });
  });
});
