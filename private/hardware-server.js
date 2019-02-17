const dweetClient = require('node-dweetio');
const five = require('johnny-five');

const board = new five.Board();
const dweetio = new dweetClient();

board.on('ready', () => {

    //set up rgb
    const redRgb = new five.Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        }
    });

    //start rgb 
    redRgb.on();
    redRgb.color("#FF0000");
    redRgb.off();


    //set up ir sensor
    const irSensor = new five.Motion(6);

    irSensor.on("motionend", () => {
        console.log("car passed!");
    })

    
   
})
