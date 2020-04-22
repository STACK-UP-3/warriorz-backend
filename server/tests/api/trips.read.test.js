import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';
import UserService from '../../services/userService';

chai.should();
chai.use(chaiHttp);

describe('================ Testing View Trips API: READ all trips of the user \n', () => {

  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });

  it('should show all trips of the user', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips?page=1&limit=2')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All The Trips are: ',
        );
        done();
      });
  });

  it('should show all trips of the user with sorting:', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips?page=1&limit=7&status=pending')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All The Trips are: ',
        );
        done();
      });
  });

  it('should show all trips of the user', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips?page=2&limit=2')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All The Trips are: ',
        );
        done();
      });
  });

  it('should not show all trips :  because query parameter must be a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips?page=xxx&limit=5')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('page must be a number');
        done();
      });
  });

  it('should not show all trips :  because of Incorrect status used.', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips?page=1&limit=7&status=xxxxx')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Incorrect status used.');
        done();
      });
  });

  it('should not show all trips : because there is no content on the page', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips?page=10&limit=10')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('There is no content on this page.');
        done();
      });
  });

});


describe('========= Testing View Trips API: READ all trips assigned to a manager: \n', () => {
  
  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });
  
  it('should show all trips assigned to the manager', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/assigned?page=1&limit=5')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All The Trips are: ',
        );
        done();
      });
  });

  it('should show all trips assigned to the manager with sorting:', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/assigned?page=1&limit=5&status=pending')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All The Trips are: ',
        );
        done();
      });
  });

  it('should not show all trips :  because of Incorrect status used.', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/assigned?page=1&limit=5&status=xxxxx')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Incorrect status used.');
        done();
      });
  });

  it('should not show all trips :  because the role must of a Manager:', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/assigned?page=1&limit=5')
      .set('Authorization', testTokens.requester)
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

describe('========= Testing View Specific Trips API: READ a specific Trip: \n', () => {
  
  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });

  it('should show a specific trip', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/2')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Here is the trip information that you requested: ',
        );
        done();
      });
  });

  it('should show a specific trip assigned to the manager', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/2')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Here is the trip information that you requested: ',
        );
        done();
      });
  });

  it('Should not show specific trip :  Trip_id must be a number:', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/xxxxx')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('trip_id must be a number');
        done();
      });
  });

  it('Should not show specific trip :  Trip does not belong to the user:', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/1')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('Unauthorised Access: Dear user this trip does not belong to you.');
        done();
      });
  });

  it('Should not show specific trip :  Trip does not belong to the manager:', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/4')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('Unauthorised Access: This trip does not belong to you.');
        done();
      });
  });

  it('Should not show specific trip : Trip is not found in the database', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/198')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('This trip is not found in the database.');
        done();
      });
  });
});
