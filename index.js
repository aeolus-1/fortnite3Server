const express = require('express');
const app = express();
const http = require('http');
var CryptoJS = require("crypto-js");
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send('server');
});




var yay = {
    num:76,
    p:yay,
}








io.on('connection', async(socket) => {

    socket.on('test', (data) => {
        
        io.sockets.emit("testReturn", yay)

    });

    
    
})


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
})
