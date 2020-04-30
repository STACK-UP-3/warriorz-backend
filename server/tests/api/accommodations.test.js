import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';
import userService from '../../services/userService';
import testData from '../fixtures/accomodationData';
import { testTokens } from '../data/auth.tokens.sample';

chai.should();
chai.use(chaiHttp);

describe('=====test POST route /api/v1/accommodatons - create accommodation ======', () => {
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
  });

  it('Should return 401 status code when token is not provided or expired', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', 'notoken')
      .send(testData[0])
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
      .post('/api/v1/accommodations')
      .send(testData[0])
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
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(testData[1])
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          'Incorrect use of special characters',
        );
        done();
      });
  });

  it('Should return 400 status code when location is not in supported cities', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(testData[6])
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
          `The location ${testData[6].location} is not supported, Please check supported cities`,
        );
        done();
      });
  });

  it('Should return 401 when user is not logged in', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', 'noToken')
      .send(testData[0])
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

  it('Should return 400 status code when empty data is given', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
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

  it('Should return 400 when invalid input is given', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(testData[2])
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 400 when image url is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(testData[3])
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
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.requester)
      .send(testData[0])
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

  it('Should return 201 status code when accommodation created successfuly', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(testData[0])
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodation created successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 201 status code when accommodation created successfuly', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.travelAdmin)
      .send(testData[7])
      .end((err, res) => {
        console.log('============', res.body, '===============');
        expect(res.body).to.have.status(201);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodation created successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 409 status code when accommodation with the name already exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/accommodations')
      .set('authorization', testTokens.supplier)
      .send(testData[0])
      .end((err, res) => {
        expect(res.body).to.have.status(409);
        expect(res.type).to.equal('application/json');
        expect(res.body)
          .to.have.property('message')
          .to.equal(
            'Accommodation with the same name already exist, Please use another name',
          );
        done();
      });
  });
});

describe('=====test GET route /api/v1/accommodatons - view accommodations ======', () => {
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
  });

  it('Should return 401 status code when token is not provided or expired', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=1')
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
      .get('/api/v1/accommodations?page=1&limit=1')
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

  it('Should return 403 status code when user do not have permisson', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=1')
      .set('authorization', testTokens.manager)
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

  it('Should return 400 when query parameters are invalid', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=dfdfgg&limit=dfnjkj')
      .set('authorization', testTokens.supplier)
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 200 status code when all accommodations are retrieved', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=1')
      .set('authorization', testTokens.supplier)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodations retrieved successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 400 when id is not an integer number', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations/NaN')
      .set('authorization', testTokens.supplier)
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return 200 status code when accommodation with given ID retrieved', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations/1')
      .set('authorization', testTokens.supplier)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodation retrieved successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 404 status code when accommodation with given ID not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations/0')
      .set('authorization', testTokens.supplier)
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodation 0 not found for this user');
        done();
      });
  });

  it('Should return empty data when no accommodations from given city', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?city=Bujumbura?page=1&limit=1')
      .set('authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodations retrieved successfully');
        done();
      });
  });

  it('Should return 401 status code when token is not provided or expired', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?city=Bujumbura?page=1&limit=1')
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
      .get('/api/v1/accommodations?city=Bujumbura?page=1&limit=1')
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

  it('Should return 200 status code when all accommodations from given city are retrieved', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?city=Kigali&page=1&limit=1')
      .set('authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodations retrieved successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 400 status code when requester does not provide the city', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=1')
      .set('authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal(
            'To get accommodations for requester , The city is required',
          );
        done();
      });
  });

  it('Should return 403 status code when user do not have permisson', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=1')
      .set('authorization', testTokens.manager)
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

  it('Should return 200 status code when all accommodations retrieved', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=1')
      .set('authorization', testTokens.travelAdmin)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodations retrieved successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 200 status code when all accommodations retrieved', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=2&limit=1')
      .set('authorization', testTokens.travelAdmin)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodations retrieved successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 200 status code when all accommodations retrieved', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=1&limit=5')
      .set('authorization', testTokens.travelAdmin)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('Accommodations retrieved successfully');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 400 status code when no content found on page', (done) => {
    chai
      .request(app)
      .get('/api/v1/accommodations?page=-2&limit=1')
      .set('authorization', testTokens.travelAdmin)
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body)
          .to.have.property('message')
          .to.equal('There is no content on this page.');
        done();
      });
  });
});
