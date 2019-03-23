const SocketIO = require('socket.io')
const app = require('./config');

const server = app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

const io = SocketIO(server);

module.exports = io;