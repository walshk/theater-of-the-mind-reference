const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(
    cors({
        origin: 'http://localhost:8080',
    })
);
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    },
});

const DATA_LOCATION = './data.txt';

io.on('connection', (socket) => {
    socket.on('addMarker', (markerString) => {
        socket.emit('addMarker', markerString);
    });

    socket.on('moveMarker', (dataString) => {
        const { movement, state } = JSON.parse(dataString);
        socket.broadcast.emit('markerMoved', movement);
        fs.writeFileSync(DATA_LOCATION, state, {
            encoding: 'utf-8',
        });
    });

    socket.on('setState', (stateString) => {
        fs.writeFileSync(DATA_LOCATION, stateString, {
            encoding: 'utf-8',
        });
        socket.broadcast.emit('state', stateString);
    });

    socket.on('getState', () => {
        const data = fs.readFileSync(DATA_LOCATION, {
            encoding: 'utf-8',
        });
        socket.emit('state', data);
    });
});

server.listen(3333, () => {
    console.log('listening on *:3333');
});
