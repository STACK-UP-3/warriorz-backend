import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { testTokens } from '../data/auth.tokens.sample';
import UserService from '../../services/userService';

chai.should();
chai.use(chaiHttp);

describe('================ Testing VIEW NOTIFICATIONS API: READ all notifications of the user \n', () => {

  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });

  it('should show all notifications that belongs to the user.', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications?page=1&limit=3')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All the notifications: ',
        );
      
       done();
      });
     
  });

  it('should show all notifications that belongs to the manager.', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications?page=1&limit=3')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'All the notifications: ',
        );
      
       done();
      });
     
  });

  it('should not show all notifications :  because query parameter must be a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications?page=xxx&limit=5')
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

  it('should not show all notifications : because there is no content on the page', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications?page=10&limit=10')
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


describe('========= Testing View Specific notifications API: READ a specific notification that is requested: \n', () => {
  
  before(async () => {
    await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
    await UserService.updateAtt({token: testTokens.manager}, { email: 'ndoliOg@gmail.com' });
  });

  it('should show a specific notification requested by the user', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/1')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Here is the notification that you requested: ',
        );
      
       done();
      });
     
  });

  it('should show a specific notification assigned to the manager or created by the manager ', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/1')
      .set('Authorization', testTokens.manager)
      .end((err, res) => { 
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Here is the notification that you requested: ',
        );
      
       done();
      });
     
  });

  it('Should not show specific notification :  Notification_id must be a number:', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/xxxxx')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('notification_id must be a number');

       done();
      });
     
  });

  it('Should not show specific notification :  notification does not belong to the user:', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/3')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('Unauthorised Access: Dear user this notification does not belong to you.');
       done();
      });
  });

  it('Should not show specific notification :  notification does not belong to the manager:', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/3')
      .set('Authorization', testTokens.manager)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        
        expect(res.body.status).to.equal(401);
        expect(res.body.message).to.equal('Unauthorised Access: This notification does not belong to you.');
       done();
      });
  });

  it('Should not show specific notification : notification is not found in the database:', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/100')
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('This notification is not found in the database.');
      
       done();
      });
     
  });
});
