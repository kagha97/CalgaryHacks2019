const dweetClient = require('node-dweetio');
const five = require('johnny-five');

const board = new five.Board();
const dweetio = new dweetClient();

//parking info
var prevTime = (new Date()).getSeconds();
var parkingInfo = {id : 1, availableSpot : 98, totalSpot : 100}

board.on('ready', () => {

    //LEDs
    const ledRed = new five.Led({
        pin : 12
    });
    const ledBlue = new five.Led({
        pin : 13
    });

    //IR Sensor
    const irSensor = new five.Motion(6);
    irSensor.on("motionend", () => {
        sendData((new Date()).getSeconds(), () => {
            //showing lights as per the parking avability
            if (parkingInfo.availableSpot < parkingInfo.totalSpot) {
                ledBlue.on();
                ledRed.off();
            } else {
                ledBlue.off();
                ledRed.on();
            }
        });
    });
});


sendData = (newTime, callBack) => {
    const dweetThing = "smart-parking-calgaryhacks-2019";
    const minTimeForPassingCar = 5;

    if (newTime - prevTime > minTimeForPassingCar || prevTime - newTime > minTimeForPassingCar) {
        parkingInfo.availableSpot++; //increase carcounter
        dweetio.dweet_for(dweetThing, parkingInfo, (err, dweet) => {
            if (err) {
                console.log("dweet error " + err);
            }
            if (dweet) {
                console.log(dweet.content);
            }
        });
        prevTime = newTime;
    }
    callBack();
}


