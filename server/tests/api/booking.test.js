import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';
import userService from '../../services/userService';
import { testTokens } from '../data/auth.tokens.sample';
import data from '../fixtures/bookingData';
import roomService from '../../services/roomService';
import accommodationService from '../../services/accommodationService';

chai.should();
chai.use(chaiHttp);

describe('=====test POST route /api/v1/accommodations/bookings - create accommodation booking ======', () => {
  let accommodationId;
  let roomId;
  before(async () => {
    await userService.updateAtt(
      { token: testTokens.travelAdmin },
      { email: 'travel@example.com' },
    );
    await userService.updateAtt(
      { token: testTokens.requester },
      { email: 'firaduk@yahoo.com' },
    );
    await userService.updateAtt(
      { token: testTokens.supplier },
      { email: 'supply@example.com' },
    );

    const accommodation = await accommodationService.createAccommodation(
      data[7],
    );
    accommodationId = accommodation.id;
    const room = await roomService.createRoom({
      ...data[8],
      accommodation_id: accommodationId,
    });

    roomId = room.id;

    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(data[7])
      .end(() => {});
  });

  it('Should return 404 status code when token is not provided or expired', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
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

  it('Should return 404 status code when token is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
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

  it('Should return 403 status code when user do not have permission to the route', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.supplier)
      .end((err, res) => {
        expect(res.body).to.have.status(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(
            'Forbidden route: Dear user you are not allowed to carry out this activity.',
          );
        done();
      });
  });

  it('Should return 400 status code when empty data is given', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send({})
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('The data can not be empty!');
        done();
      });
  });

  it('Should return 400 status code when invalid id is given (is not integer)', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send(data[0])
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 400 status code when invalid date format is given', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send(data[1])
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 400 status code when checkin date is later than checkout date', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send(data[2])
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(
            `The checkin date ${data[2].checkInDate} can not be later then checkout date ${data[2].checkOutDate}`,
          );
        done();
      });
  });

  it('Should return 400 status code when no accommodation found with given id', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send(data[3])
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(`Accommodation ${data[3].accommodationId} not found`);
        done();
      });
  });

  it('Should return 400 status code when no room found with given id', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send(data[4])
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(
            `Room ${data[4].roomId} not found in given accommodation facility`,
          );
        done();
      });
  });

  it('Should return 400 status code when no trip found with given id', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send(data[6])
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(`Trip ${data[6].tripId} not found`);
        done();
      });
  });

  it('Should return 201 status code when booking is created successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send({
        accommodationId,
        roomId,
        tripId: 1,
        checkInDate: data[5].checkInDate,
        checkOutDate: data[5].checkOutDate,
      })
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(`The Accommodation has been booked successfuly`);
        done();
      });
  });

  it('Should return 400 status code when requested room is booked already', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations/bookings')
      .set('authorization', testTokens.requester)
      .send({
        accommodationId,
        roomId,
        tripId: 1,
        checkInDate: data[5].checkInDate,
        checkOutDate: data[5].checkOutDate,
      })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'The room you equested is aleady booked in given dates, Please choose from other rooms',
        );
        done();
      });
  });
});
