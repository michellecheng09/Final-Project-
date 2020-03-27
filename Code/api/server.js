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

io.on('connection', (sock) => {
    players.push(new Player(sock, sock.id));

    sock.on('name', (name) => {
        players.forEach((player) => {
            if (player.id === sock.id) {
                player.name = name;
            }
            io.emit('name', player.name);
        });
        console.log(players);
    });
});

server.listen(5000, () => {
    console.log('Server started on 5000');
});

