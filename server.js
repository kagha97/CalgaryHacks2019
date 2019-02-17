const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dweetClient = require('node-dweetio');
const http = require('http').Server(app);
const io = require('socket.io')(http);


const data = require('./data');
const dweetio = new dweetClient();
const dweetThing = data.dweetThing;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

// app.use((req, res) => {
//   res.status(404).json({
//     message: 'Resource not found'
//   });
// });

// io.on('connection', (socket) => {
//   console.log('Connection has been established with browser.');
//   // socket.on('disconnect', () => {
//   //   console.log('Browser client disconnected from the connection.');
//   // });
// });

io.on('connection', (socket) => {
  console.log('Connection has been established with browser.');
  socket.on('disconnect', () => {
    console.log('Browser client disconnected from the connection.');
  });
})

dweetio.listen_for(dweetThing, (dweet) => {
  console.log(dweet.content);
  const data = dweet.content;
  io.emit('server-data', data);
});

const server = app.listen(8080, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
