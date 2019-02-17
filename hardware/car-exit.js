const dweetClient = require('node-dweetio');
var five = require("johnny-five");

//parking location config
const portNo = 0;
const parkingLocation = 1;

//get data
var data = require('../data');

//parking model
const Parking = data.ParkingModel;

// connect board at specified port
const board = new five.Board(data.ports[portNo]);
const dweetio = new dweetClient();

//connect to database and get info of parking
Parking.find({title : data.listOfParkings[parkingLocation]}).then((response) => {

    var parkingInfo = response.length > 0 ? response[0] : "";
    //timer
    var prevTime = (new Date()).getSeconds();

    board.on('ready', () => {
        //LEDs
        const ledRed = new five.Led({
            pin: 12
        });

        //IR Sensor
        const irSensor = new five.Motion(6);
        irSensor.on("motionend", () => {
            sendData((new Date()).getSeconds());
        });
    });


    //send data through socket
    sendData = (newTime) => {
        const dweetThing = data.dweetThing;
        const minTimeForPassingCar = data.MinTimeForPassingCar;

        //if minimum time has elapsed then increase counter and send data
        if ((newTime - prevTime > minTimeForPassingCar || prevTime - newTime > minTimeForPassingCar) && parkingInfo.availableSpot < parkingInfo.totalSpot)  {
            let sendBody = {parkingInfo, updateType : 'increase'}
            dweetio.dweet_for(dweetThing, sendBody, (err, dweet) => {
                if (err) {
                    console.log("dweet error " + err);
                }
                if (dweet) {
                    console.log(dweet);
                    parkingInfo.availableSpot++;
                }
            });
            prevTime = newTime;
        }
    }
}).catch();


