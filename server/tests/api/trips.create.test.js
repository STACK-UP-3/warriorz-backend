import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';
import trip from '../fixtures/tripData';
import UserService from '../../services/userService';
import { testTokens } from '../data/auth.tokens.sample';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('===== test create one way trip request =====', () => {
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

  it('Should validation error with multiple Destination', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multiple')
      .set('Authorization', testTokens.requester)
      .send(trip[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should destination city not found with multiple Destination', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multiple')
      .set('Authorization', testTokens.requester)
      .send(trip[10])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(404);
        done();
      });
  });

  it('Should date can not be less than Travel date from multiple Destination', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multiple')
      .set('Authorization', testTokens.requester)
      .send(trip[9])
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

  it('Should create a one way trip request with multiple Destination', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multiple')
      .set('Authorization', testTokens.requester)
      .send(trip[8])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'A one-way-trip was registered successfully.',
        );
        setImmediate(done)
      });
  });

  it('Should not create Return Trip request: Because Origin and Destination can not be the same.', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips/multiple')
      .set('Authorization', testTokens.requester)
      .send(trip[12])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Origin and Destination can not be the same');
        done();
      });
  });

  it('Should create a one way trip request ', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'A one-way-trip was registered successfully.',
        );
        done();
      });
  });

  it('Should create a one way trip request ', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'A one-way-trip was registered successfully.',
        );
        done();
      });
  });

  it('Should not create trip request: Because Origin City is not supported by Barefoot Nomad', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[1])
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

  it('Should not create trip request: Because Destination City is not supported by Barefoot Nomad ', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[5])
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

  it('Should not create trip request: Because required data is not provided ', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[2])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('date is required');
        done();
      });
  });

  it('Should not create trip request: Because required data(Date) contains Incorrect time format ', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[3])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('error');
        expect(res.body.message).to.have.property('format');
        expect(res.body.message).to.have.property('path');

        expect(res).to.have.status(400);
        expect(res.body.message.error).to.equal('Incorrect Date Format');
        expect(res.body.message.path).to.equal('date');
        done();
      });
  });

  it('Should not create Return Trip request: Because Origin and Destination can not be the same.', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[11])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Origin and Destination can not be the same');
        done();
      });
  });

  it('Should not create trip request: Because There is, Incorrect use of special characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.have.property('error');
        expect(res.body.message).to.have.property('tip');
        expect(res.body.message).to.have.property('path');

        expect(res).to.have.status(400);
        done();
      });
  });

  it(' Should create a Return Trip request .', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[6])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'A return-trip was registered successfully.',
        );
        done();
      });
  });

  it('Should not create Return Trip request: Because Return date can not be less than Travel date', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', testTokens.requester)
      .send(trip[7])
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
