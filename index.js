var port = process.env.PORT || 3000;

const io = require('socket.io')(port);
var ib = 0;

const pass = "test123";
var data;
io.setMaxListeners(0);
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
    socket.on("loginServerFinger", (msg) => {

        if (msg == pass) {
            io.emit("returnPass", "true");

        } else {
            io.emit("returnPass", "false");
        }


    });



    io.emit("serverAccepted", "true");
    socket.on("chipMessage", (msg) => {
        console.log(msg);
        if (msg != null) {
            data = msg;

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
    socket.on("btnClickedFinger", (msg) => {
        console.log("btnClickedFinger")
        io.emit("addFingerBtnClick", "");
    })
    socket.on("requestData", (msg) => {
        //io.emit("toUno", "{\"currentMod\":\"requestData\"}");
        if (data != null) {
            io.emit("espMessage", data);
        }
    });

    socket.on("opendoor",(msg)=>{
        if(msg == "d667djkjd"){
            io.emit("toUno", "{\"currentMod\":\"openDoor\"}");
        }
    })

    function requestData() {
        io.emit("toUno", "{\"currentMod\":\"requestData\"}");
        setTimeout(requestData,1800000);
    }
    if(ib == 0){
        requestData();
        ib++;
    }
    
})
