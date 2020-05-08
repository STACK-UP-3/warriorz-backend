/* eslint-disable no-unused-vars */
import 'dotenv/config';
import chai, { expect } from 'chai';
import io from 'socket.io-client';
import { server } from '../../index';

const Port = server.address().port;

const socketURL = `http://localhost:${Port}`;

const options = {
    transports: ['websocket'],
    'force new connection': true,
     forceNew: true,
  };

describe('================ Testing SOCKET CONNECTION \n', () => {
    let socketClient;

    before((done) => {
       socketClient = io.connect(socketURL, options);
        done();
    });

    after((done)=>{
        socketClient.disconnect();
        done();
    });

    it('should send USER CONNECTED', (done)=>{
        socketClient.on('new-notification', (notificationData)=>{
            expect(notificationData).to.be.an('object');
            done();
        });
    });

});