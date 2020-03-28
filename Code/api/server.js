const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const Rummy = require('./game');
const Player =  require('./player')

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

const players = [] 
const lobby = []

io.on('connection', (sock) => {
    if (players.length === 0)
        players.push(new Player(sock, sock.id, true))
    else
        players.push(new Player(sock, sock.id));

    sock.on('name', (name) => {
        players.forEach((player) => {
            if (player.id === sock.id) {
                player.playerSignedIn(name);
                lobby.push(name)
            }
        });
        io.emit('lobby', lobby);
        console.log(players);
    });

    sock.on('start', (data) => {
        console.log(data);
    })
});


server.listen(5000, () => {
    console.log('Server started on 5000');
});

