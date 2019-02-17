const express = require('express');
const app = express();
const dweetClient = require('node-dweetio');

//start server
const server = app.listen(8080, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
var io = require('socket.io').listen(server);

//collect data from file
const data = require('./data');
const dweetio = new dweetClient();
const dweetThing = data.dweetThing;

//start serving static files
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

//socket connection with client
io.on('connection', (socket) => {
  console.log('Connection has been established with browser.');
  socket.on('disconnect', () => {
    console.log('Browser client disconnected from the connection.');
  });
})

//dweetio connection with machine
dweetio.listen_for(dweetThing, (dweet) => {
  console.log(dweet.content);
  const data = dweet.content;
  
  io.emit('data', data);
});

