const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send('server');
});

const clashApi = require('clash-of-clans-api')



console.log("im aliv plz")


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
})
