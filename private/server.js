const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const dweetClient = require('node-dweetio');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

const dweetio = new dweetClient();
const dweetThing = 'Parking-Application';


const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  let readSteam = fs.createReadStream(__dirname + '/../public/index.html', 'utf8');
  readSteam.pipe(res);
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found'
  });
});

// io.on('connection', (socket) => {
//   console.log('Connection has been established with browser.');
//   // socket.on('disconnect', () => {
//   //   console.log('Browser client disconnected from the connection.');
//   // });
// });

io.on('connection', (socket) => {
  console.log('Connection has been established with browser.');
  // socket.on('disconnect', () => {
  //   console.log('Browser client disconnected from the connection.');
  // });
})

dweetio.listen_for(dweetThing, (dweet) => {
  const data = {
    carStatus: dweet.content
  };
  io.emit('sensor-data', data);
});


