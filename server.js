const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//app.use(express.static('public'));
//app.use(express.static(__dirname));

// Route specifically for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Emit the time every 60 seconds (2000 ms)
setInterval(() => {
  const currentTime = new Date().toLocaleTimeString();
  io.emit('timeUpdate', currentTime);
}, 2000);

io.on('connection', (socket) => {
  // Send current time immediately upon connection
  socket.emit('timeUpdate', new Date().toLocaleTimeString());
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});