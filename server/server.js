import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import {
    addMarker,
    getMarkers,
    updateMarker,
    removeMarker,
    updateMarkerTraits,
} from './eventController.js';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:8080',
    })
);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', async (socket) => {
    socket.on('addMarker', async (markerString) => {
        await addMarker(socket, markerString);
    });

    socket.on('getMarkers', async () => {
        await getMarkers(socket);
    });

    socket.on('moveMarker', async (markerMovementString) => {
        await updateMarker(socket, markerMovementString);
    });

    socket.on('updateMarkerTraits', async (markerString) => {
        await updateMarkerTraits(socket, markerString);
    });

    socket.on('removeMarker', async (markerId) => {
        await removeMarker(socket, markerId);
    });
});

server.listen(3333, () => {
    console.log('listening on *:3333');
});
