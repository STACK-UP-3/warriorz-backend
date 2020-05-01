import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';
import { testTokens } from '../data/auth.tokens.sample';

dotenv.config();

chai.should();
chai.use(chaiHttp);

describe('===== Comment Tests =====', () => {
//   // -------------------------------------
//   // Test Cases
//   // -------------------------------------
    let commentId;
    const content = 'I want a discount on my trip';

    it('Should return Invalid Trip ID', (done) => {
    chai
      .request(app)
      .post('/api/v1/comment/jgkjh')
      .send({content})
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            'Invalid trip Request Id', 
          );
      });
        done();
    });

    it('Should return Trip ID NotFound', (done) => {
    chai
      .request(app)
      .post('/api/v1/comment/7678')
      .send({content})
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
            'Trip Request NotFound',
          );
      });
        done();
    });

    it('Should return Validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/comment/2')
      .send(content)
      .set('Authorization', testTokens.requester)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            'content is required',
          );
      });
        done();
    });

    it('Should create a comment', (done) => {
    chai
      .request(app)
      .post('/api/v1/comment/2')
      .set('Authorization', testTokens.requester)
      .send({content})
      .end((err, res) => {
        commentId = res.body.data.id;
        expect(res.statusCode).to.equal(201);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res).to.have.status(201);
        expect(res.body.message).to.equal(
          'A new Comment Was Sucessfully Created',
        );
        done();
      });
    });

    it('Should return Invalid Comment Id', (done) => {
        chai
          .request(app)
          .delete('/api/v1/comment/2/jhgvn')
          .set('Authorization', testTokens.requester)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.type).to.equal('application/json');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
    
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal(
                'Invalid Comment Id',
              );
            });
            done();
    });

    it('Should return Comment NotFound', (done) => {
        chai
          .request(app)
          .delete('/api/v1/comment/2/7809')
          .set('Authorization', testTokens.requester)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.type).to.equal('application/json');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
    
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal(
                'Comment NotFound',
              );
            });
            done();
    });

    it('Should Comment Not Your to Edit', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/comment/2/${commentId}`)
        .set('Authorization', testTokens.manager)
        .end((err, res) => { 
          expect(res.statusCode).to.equal(403);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
  
          expect(res).to.have.status(403);
          expect(res.body.message).to.equal(
            'This Comment is not Yours, To Edit',
          );
          done();
        });
  });

    it('Should Comment Was Sucessfully Deleted', (done) => {
        chai
          .request(app)
          .delete(`/api/v1/comment/2/${commentId}`)
          .set('Authorization', testTokens.requester)
          .end((err, res) => { 
            expect(res.statusCode).to.equal(200);
            expect(res.type).to.equal('application/json');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('data');
    
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal(
              'The Comment Was Sucessfully Deleted',
            );
            done();
          });
    });

});
