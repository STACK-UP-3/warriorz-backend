import sockets from 'socket.io';
import app from './app';

const PORT = process.env.PORT || process.env.HTTP_PORT || 5000;

// Server init
const server = app.listen(PORT, () => {
  console.log(`\n Express Server - listening on port: ${PORT} \n`);
});

// Sockets init ~ https://youtu.be/UwS3wJoi7fY?t=168
const io = sockets(server);
// Listen for socket connection
io.on('connection', (socket) => {
  console.log('Socket connection - successful...', socket.server);

  // Listen for messages passed from socket
  socket.on('chat', (data) => {
    // Save the message to storage

    // Emit (Pass) the message to all socket clients
    io.sockets.emit('chat', data);
  });
});
