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

var lobbys = {}

function createLobby(id=`${Math.random()}`) {
    var newId = id,
        newLobby = {
            id:newId,
            created:(new Date().getTime()),

            state:new GameState.gameState,
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

        if ((new Date().getTime())-lobby.created > (10)*(60)*1000) {
            delete lobbys[id]
            console.log("deleted lobby", id)
        }
        
    }
}

setInterval(updateLobbys, 500)


io.on('connection', async(socket) => {

    socket.on('createLobby', (data) => {
        createLobby(data.id)
       


    });
    socket.on('requestLobby', (data) => {
        if (lobbys[data.id] != undefined) {
            socket.emit("returnLobby", lobbys[data.id])
            console.log("sending back lobby")
        } else {
            console.log("requested unkown lobby")
        }
       


    });

    

    
    
})


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
})
