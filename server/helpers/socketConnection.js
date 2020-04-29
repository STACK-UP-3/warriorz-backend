/* eslint-disable consistent-return */
/* eslint-disable import/no-mutable-exports */
import socketIO from 'socket.io';

let name;

export let io = socketIO(name);

export const startSocket =(server) =>{
     io = socketIO(server);
     io.on('connection', socket => {
        console.log('user connected');
        socket.emit('new-notification', {
          createdAt: 'YYYY-MM-DD',
          subject: 'what the notification is all about',
          isRead: 'is the notification read by the user',
        });
      });
};
