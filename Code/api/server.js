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
let requiredPlayers = 0;

io.on('connection', (sock) => {
    if (players.length === 0)
        players.push(new Player(sock, sock.id, true))
    else
        players.push(new Player(sock, sock.id, false));

    sock.on('name', (name) => {
        players.forEach((player) => {
            if (player.id === sock.id) {
                player.playerSignedIn(name);
                lobby.push(name)
            }
        });
        io.emit('lobby', lobby);

        console.log(players.length == requiredPlayers);
        console.log(`Number of players: ${players.length}\nRequired number: ${requiredPlayers}`);
        if(requiredPlayers == players.length) {
            io.emit('start'); 
            console.log('everyone is here')
        }
    });

    sock.on('num players', (data) => {
        requiredPlayers = data;
    })
});


server.listen(5000, () => {
    console.log('Server started on 5000');
});

