const dweetThing = "smart-parking-calgaryhacks-2019";

//import mongoose module
const mongoose = require('mongoose');

//get connection reference
const dbConnection = mongoose.connect('mongodb://localhost:27017/smart_parking', {
    useNewUrlParser: true
});

var parkingSchema = mongoose.Schema({
    title : String,
    availableSpot : Number,
    totalSpot : Number,
    prices : Object,
    hours : Object,
});

var ParkingModel = mongoose.model('parking', parkingSchema, 'parkings');

//list of ports
const port1 =  {port : 'COM6'};
const port2 = {port : 'COM9'};
const port3 = {port : 'COM12'};
const ports = [port1, port2, port3];
//list of parking titles
const listOfParkings = ['University of Calgary', 'Sunridge Mall', 'Bow Valley College'];

module.exports = {dweetThing, ports, dbConnection, ParkingModel, listOfParkings};