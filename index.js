const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT;
console.log(port);

app.get('/', function(req, res) {
    res.sendfile('index.html');
 });
io.on("connection", function (socket) {
    console.log("A user cxonnected");
    console.log(socket.id);
    //socket.emit("addFinger",'{"type":"changeMod","currentMod":"addFinger","fingerId":"2"}');
    io.emit("serverAccepted","true");
    socket.on("chipMessage",(msg) =>{
        
        console.log("FingerId:" + msg.fingerId);
        console.log("statusDoor:" + msg.statusDoor);
        console.log("statusBell:" + msg.statusBell);
        console.log("statusFinger:" + msg.statusFinger);
        io.emit("espMessage",msg);
    });
    socket.on("test",(msg)=> {
        console.log(msg);
    });
   
    socket.on("disconnect",()=>{
        console.log("A user disconnected");
    })
})

http.listen(port, function() {
    console.log('listening on *:' + port);
 });

