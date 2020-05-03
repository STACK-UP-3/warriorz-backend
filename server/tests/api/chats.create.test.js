import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// ...Local file imports...
import app from '../../app';
// import UserService from '../../services/userService';
import { testTokens } from '../data/auth.tokens.sample';

chai.use(chaiHttp);

describe('>>> Testing Chats API - POST/Create new public chat \n', () => {
  // -------------------------------------
  // Hooks: https://mochajs.org/#hooks
  // -------------------------------------

  before(async () => {
    // await UserService.updateAtt({token: testTokens.superAdmin}, { email: 'admin@example.com' });
    // await UserService.updateAtt({token: testTokens.requester}, { email: 'firaduk@yahoo.com' });
  });
  after(async () => {});

  // -------------------------------------
  // Test Cases
  // -------------------------------------

  // Chat message is valid, and User is valid
  it('should create a new public Chat', (done) => {
    chai
      .request(app)
      .post('/api/v1/chats')
      .set('Authorization', testTokens.requester)
      .send({
        senderId: 8,
        message: 'Welcome to public chat',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('sender');
        expect(res.body.data).to.have.property('receiver');
        expect(res.body.data).to.have.property('chatMessage');
        // expect(res.body.data).to.have.property('date');

        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Chat created successfully');
        expect(res.body.data).to.eql({
          sender: 'Super Admin',
          receiver: null,
          chatMessage: 'Welcome to public chat',
          // date: '', // Fix date format
        });
        done();
      });
  });
});
