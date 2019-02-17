 const dweetThing = "smart-parking-calgaryhacks-2019";
 var parkings = {
    UofC: {
        id: 1,
        title : "University of Calgary",
        availableSpot: 300,
        totalSpot: 300,
        prices : {hr : 10, day : 20, month : 250},
        hours : {weekdays : "9am to 9pm", weekends : "7am to 11pm"}
    },

    BowValley : {
        id: 2,
        title : "Bow Valley College",
        availableSpot: 150,
        totalSpot: 150,
        prices : {hr : 15, day : 20, month : 350},
        hours : {weekdays : "24hr", weekends : "24hr"}
    },

    Superstore : {
        id: 3,
        title: "Super Store, Mcnight",
        availableSpot: 200,
        totalSpot: 200,
        prices : {hr : 10, day : 28, month : 300},
        hours : {weekdays : "9am to 9pm", weekends : "7am to 11pm"}
    },

    MarlboroughMall : {
        id: 4,
        title : "Marlborough Mall",
        availableSpot: 0,
        totalSpot: 200,
        prices : {hr : 7, day : 20, month : 224},
        hours : {weekdays : "24hr", weekends : "24hr"}
    },

    SunridgeMall : {
        id: 5,
        title : "Sunridge Mall",
        availableSpot: 0,
        totalSpot: 300,
        prices : {hr : 7, day : 18, month : 170},
        hours : {weekdays : "9am to 9pm", weekends : "7am to 11pm"}
    }
 };

module.exports = {dweetThing, parkings};