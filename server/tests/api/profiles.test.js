import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import userService from '../../services/userService';
import photoService from '../../services/photoService';
import profileTestData from '../fixtures/profle.testData';

chai.should();
chai.use(chaiHttp);

const encode = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '4h' });
  return token;
};

const data = {
  firstname: 'francis',
};

let token, notVerifToken, userwithPhotoToken, withoutToken;
const notFoundUserToken = encode({ email: 'motfound@gmail.com', id: 0 });

before(async () => {
  const user = await userService.createuser(profileTestData[0]);
  const notVerifieduser = await userService.createuser(profileTestData[1]);
  const userWithPhoto = await userService.createuser(profileTestData[2]);
  const userWithoutToken = await userService.createuser(profileTestData[3]);
  const notFoundUser = await userService.createuser(profileTestData[4]);
  await photoService.createphoto({
    ownerId: userWithPhoto.dataValues.id,
    type: 'user',
    url:
      'https://res.cloudinary.com/dcna45id5/image/upload/v1586427877/samples/landscapes/nature-mountains.jpg',
  });
  token = encode({ ...profileTestData[0], id: user.dataValues.id });
  notVerifToken = encode({
    ...profileTestData[1],
    id: notVerifieduser.dataValues.id,
  });
  userwithPhotoToken = encode({
    ...profileTestData[2],
    id: userWithPhoto.dataValues.id,
  });
  withoutToken = encode({
    ...profileTestData[3],
    id: userWithoutToken.dataValues,
  });
  await userService.updateAtt({ token }, { id: user.dataValues.id });
  await userService.updateAtt(
    { token: notVerifToken },
    { id: notVerifieduser.dataValues.id },
  );
  await userService.updateAtt(
    { token: userwithPhotoToken },
    { id: userWithPhoto.dataValues.id },
  );
  await userService.updateAtt(
    { token: notFoundUserToken },
    { id: notFoundUser.dataValues.id },
  );
});

describe('=====test route /api/v1/profile - update profile info======', () => {
  it('Should return 401 status code when token is not provided or expired', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 404 status code when user not found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', notFoundUserToken)
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 403 status code when user is not verified', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', notVerifToken)
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.status(403);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Please verify your account first!');
        done();
      });
  });

  it('Should return 400 status code when special character are used', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', token)
      .send({ firstname: '@#@$' })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.have.property('error')
          .to.equal('Incorrect use of special characters');
        done();
      });
  });

  it('Should return 401 when user is not logged in', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', withoutToken)
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.status(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Unauthorised Access: You have to login to Proceed');
        done();
      });
  });

  it('Should return 401 when user is not logged in', (done) => {
    chai
      .request(app)
      .get('/api/v1/profile')
      .set('authorization', withoutToken)
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.status(401);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Unauthorised Access: You have to login to Proceed');
        done();
      });
  });

  it('Should return 400 status code when empty data is given', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', token)
      .send({})
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Can not update empty data!');
        done();
      });
  });

  it('Should return 400 when invalid input is given', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', token)
      .send({ firstname: '' })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 400 when photoUrl is invalid', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', token)
      .send({ photoUrl: '' })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 400 when photoUrl is not image url', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', token)
      .send({ photoUrl: 'https://google.com' })
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('The userPhoto is not image url with(jpeg,jpg,png)!');
        done();
      });
  });

  it('Should update profile when authenticated and data are valid', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', token)
      .send(data)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Profile updated successfuly');
        done();
      });
  });

  it('Should update profile with photo url', (done) => {
    chai
      .request(app)
      .patch('/api/v1/profile')
      .set('authorization', userwithPhotoToken)
      .send({
        photoUrl:
          'https://res.cloudinary.com/dcna45id5/image/upload/v1586427877/samples/landscapes/nature-mountains.jpg',
      })
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Profile updated successfuly');
        done();
      });
  });

  it('Should return user profile data when user is authenticated', (done) => {
    chai
      .request(app)
      .get('/api/v1/profile')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.body.message).to.equal('User profile found');
        done();
      });
  });

  it('Should return user profile with photoUrl when user is authenticated', (done) => {
    chai
      .request(app)
      .get('/api/v1/profile')
      .set('authorization', userwithPhotoToken)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('User profile found');
        done();
      });
  });
});
