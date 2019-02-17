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
//parking model
const Parking = data.ParkingModel;

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
  Parking.find().then((response) => {
    io.emit('data', response);
  });
  socket.on('disconnect', () => {
    console.log('Browser client disconnected from the connection.');
  });
})

//dweetio connection with machine
dweetio.listen_for(dweetThing, (dweet) => {
  console.log(dweet);
    Parking.find({
              title: dweet.content.parkingInfo.title,
          })
              .then((response) => {
                  //update database and send response to client
                  if (response.length > 0) {
                      let aParking = response[0];
                      dweet.content.updateType === 'decrease' ? aParking.availableSpot-- : aParking.availableSpot++;
                      //send response to client
                      aParking.save().then(() => {
                          Parking.find().then(parkingData => {
                              io.emit('data', parkingData);
                              console.log(response);
                          })
                          .catch(console.log);
                      }).catch(console.log);
                  }
              }).catch(console.log);

});
