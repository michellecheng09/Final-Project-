const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//Add the imported classes to the server
const Rummy = require('./game');
const Player =  require('./player');
const Tile = require('./Tile');
const Deck = require('./Deck')

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

const players = [] 
const lobby = []
let requiredPlayers = 4;
const deck = new Deck();

// ==========================
// ===   Event Handling   ===
// ==========================


// for reference, there is a small error in the required players handling. Need to figure out some
// sort of solution for when a number hasn't been set yet and >= 4 people have joined
io.on('connection', (sock) => {
    
    sock.on('name', (name) => {
        if (players.length === 0) {
            players.push(new Player(sock, sock.id, name, true));
            lobby.push(name)
        } else if (players.length < requiredPlayers) {
            players.push(new Player(sock, sock.id, name, false));
            lobby.push(name)
        } else {
            while(players.length > requiredPlayers) {
                players.pop();
                lobby.pop();
            }
        }

        io.emit('lobby', lobby);

        if(requiredPlayers == players.length) {
            //Emit message to start the game
            io.emit('start'); 
            console.log('everyone is here')
        } else { 
            io.emit('waiting'); 
        }
    });

    sock.on('num players', (data) => {
        requiredPlayers = data;
        if(requiredPlayers == players.length) {
            io.emit('start');
        }
    })
});


server.listen(5000, () => {
    console.log('Server started on 5000');
});

