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

var GameState = require("./Game.js").GameState

console.log(GameState)

var lobbys = {}

function createLobby() {
    var newId = `${Math.random()}`,
        newLobby = {
            id:newId,
            created:(new Date().getTime()),

            state:1,
        }

    lobbys[newId] = newLobby
    console.log("created lobby", newId)

    return newLobby

}

function updateLobbys() {
    var lobbysId = Object.keys(lobbys)
    for (let i = 0; i < lobbysId.length; i++) {
        const id = lobbysId[i],
            lobby = lobbys[id]

        if ((new Date().getTime())-lobby.created > (60)*1000) {
            delete lobbys[id]
            console.log("deleted lobby", id)
        }
        
    }
}

setInterval(updateLobbys, 500)


io.on('connection', async(socket) => {

    socket.on('createLobby', (data) => {
        createLobby()
       


    });

    

    
    
})


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
})
