// Initiates Johnny-five
const { Board, Led } = require("johnny-five");
const board = new Board({ port: "/dev/cu.usbmodem141101"}); //CHANGE THIS

//Initiates Express
const express = require("express");
const app = express();

//var for checking if the light is on or off
let isLightOn = false;

board.on("ready", () => {
//creates a variable for the led connected to the port - in this case port 9
    const led = new Led(9); // CHANGE THIS

    //initiates server on port 3001
    app.listen(3001, () => { console.log("listening at 3001") });
    app.use(express.static("public"));
    app.use(express.json({ limit: "1mb" }));

    app.post("/set-arduino-light", (request, response) => {
        const data = request.body;
        const someString = "Hi buddy!";

        //for debugging
        console.log("message: " + data.message);
        console.log("someBoolean: " + data.someBoolean);

        // function for turning the blinking ON/OFF
        if(isLightOn == false) {
        led.blink(500);
        } else {
        led.stop().off();
        }
        isLightOn = !isLightOn;
        
        //for debugging using phone
        data.isLightOn = isLightOn;
        data.someString = someString;
        response.json({
        status: "success",
        data: JSON.stringify(data)
        });
    });

    app.get('/light-state', function (request, response) {
        console.log("get received");
        
        const data = {isLightOn};
        response.send(data);
    });
});