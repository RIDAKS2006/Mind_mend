// socket.js
const socketIO = require('socket.io');

function initSocket(server) {
  const io = socketIO(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('New WebSocket connection: ' + socket.id);

    socket.on('joinRoom', ({ room }) => {
      socket.join(room);
    });

    socket.on('message', ({ room, user, text }) => {
      io.to(room).emit('message', { user, text, time: new Date() });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected: ' + socket.id);
    });
  });

  return io;
}

module.exports = initSocket;

