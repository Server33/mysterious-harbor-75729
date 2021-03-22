var port = process.env.PORT || 3000;
const io = require('socket.io')(port);

console.log(port);
const pass = "test123";
var data;
io.on("connection", function (socket) {
    console.log("A user cxonnected");
    console.log(socket.id);
    //socket.emit("addFinger",'{"type":"changeMod","currentMod":"addFinger","fingerId":"2"}');
    socket.on("loginServer", (msg) => {

        if (msg == pass) {
            io.emit("returnPass", "true");
        } else {
            io.emit("returnPass", "false");
        }
    });
    io.emit("serverAccepted", "true");
    socket.on("chipMessage", (msg) => {
        if (msg != null) {
            data = msg;
            console.log(JSON.stringify(msg));
            if (msg.hasOwnProperty("fingerId")) {
                console.log("FingerId:" + msg.fingerId);
            }
            if (msg.hasOwnProperty("statusDoor")) {
                if (msg.statusDoor == "opened") {
                    msg.statusDoor = true;

                } else if (msg.statusDoor == "closed") {
                    msg.statusDoor = false;
                }
                console.log("statusDoor:" + msg.statusDoor);
            }
            if (msg.hasOwnProperty("statusBell")) {
                console.log("statusBell:" + msg.statusBell);
            }
            if (msg.hasOwnProperty("statusFinger")) {

                if (msg.statusFinger == "notDetected") {
                    msg.statusFinger = false;
                } else if (msg.statusFinger == "fingerSucceed") {
                    msg.statusFinger = true;
                }
                console.log("statusFinger:" + msg.statusFinger);
            }

            io.emit("espMessage", msg);
        }
    });
    socket.on("requestData", (msg) => {
        //io.emit("toUno", "{\"currentMod\":\"requestData\"}");
        io.emit("espMessage",data);
    })
    socket.on("test", (msg) => {
        // console.log(msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
})

