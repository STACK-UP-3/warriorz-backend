import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import authController from '../controllers/usercontroller';

const { expect } = chai;

dotenv.config();

chai.use(chaiHttp);

describe('GOOGLE oAuthentication tests', () => {
  it('should SIGNUP by Google', async () => {
    const req = {
      user: {
        id: '5',
        displayName: 'christophe kwizera',
        name: { familyName: 'kwizera', givenName: 'christophe'},
        emails: [ { value: 'christophekwizera1@yahoo.fr', verified: true } ],
        photos: [
          {
            value: 'https://lh3.googleusercontent.com/a-/AOh14GiM823UjlwUSpy6PAjvJTj35tSUwBki67TMc8WHZw',
          },
        ],
        provider: 'google',
      },
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.Oauth(req, res);
    expect(results.body.status).to.equal(201);
  });

  it('should SIGNUP by Facebook', async () => {
    const req = {
      user: {
        id: '9',
        displayName: 'christophe kwizera',
        name: { familyName: 'kwizera', givenName: 'christophe'},
        emails: [ { value: 'christophekwizera1@fb.com', verified: true } ],
        photos: [
          {
            value: 'https://lh3.googleusercontent.com/a-/AOh14GiM823UjlwUSpy6PAjvJTj35tSUwBki67TMc8WHZw',
          },
        ],
        provider: 'facebook',
      },
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.Oauth(req, res);
    expect(results.body.status).to.equal(201);
  });

  it('should SIGN by Facebook', async () => {
    const req = {
      user: {
        id: '9',
        displayName: 'christophe kwizera',
        name: { familyName: 'kwizera', givenName: 'christophe'},
        emails: [ { value: 'christophekwizera1@fb.com', verified: true } ],
        photos: [
          {
            value: 'https://lh3.googleusercontent.com/a-/AOh14GiM823UjlwUSpy6PAjvJTj35tSUwBki67TMc8WHZw',
          },
        ],
        provider: 'facebook',
      },
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.Oauth(req, res);
    expect(results.body.status).to.equal(200);
  });

  it('should SIGNIN by Google', async () => {
    const req = {
      user: {
        id: '5',
        displayName: 'christophe kwizera',
        name: { familyName: 'kwizera', givenName: 'christophe'},
        emails: [ { value: 'christophekwizera1@yahoo.fr', verified: true } ],
        photos: [
          {
            value: 'https://lh3.googleusercontent.com/a-/AOh14GiM823UjlwUSpy6PAjvJTj35tSUwBki67TMc8WHZw',
          },
        ],
        provider: 'google',
      },
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.Oauth(req, res);
    expect(results.body.status).to.equal(200);
  });

  it('should REDIRECT a user', async () => {
    const req = {
      user: {
        id: '4',
        displayName: 'christophe kwizera',
        name: { familyName: 'kwizera', givenName: 'christophe' },
        emails: [ { value: 'christophekwizera1@yahoo.fr', verified: true }],
        photos: [
          {
            value: 'https://lh3.googleusercontent.com/a-/AOh14GiM823UjlwUSpy6PAjvJTj35tSUwBki67TMc8WHZw',
          },
        ],
        provider: 'google',
      },
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.Oauth(req, res);
    expect(results.body.status).to.equal(301);
  });
});
