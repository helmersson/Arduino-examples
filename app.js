const five = require("johnny-five");
const board = new five.Board({port: "/dev/cu.usbmodem143101"});

board.on("ready", function() {

    const led = new five.Led(9);

    led.blink(1000);

});