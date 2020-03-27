const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const Rummy = require('./game');

const app = express();

const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {
    if (waitingPlayer) {
        new Rummy(waitingPlayer, sock);
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for an opponent');
    }
});

server.listen(5000, () => {
    console.log('Server started on 5000');
});
