import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import {
    addMarker,
    getMarkers,
    updateMarker,
    removeMarker,
    isMarkerLocked,
    lockMarker,
    unlockMarker,
} from './eventController.js';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:8080',
    })
);
app.use(bodyParser.json());

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

    socket.on('removeMarker', async (markerId) => {
        await removeMarker(socket, markerId);
    });
});

app.post('/lockMarker', async (req, res) => {
    const markerString = req.body.markerString;
    console.log('locking marker');

    const isAlreadyLocked = await isMarkerLocked(markerString);
    if (isAlreadyLocked) {
        res.status(409).send(
            'Marker is currently being moved by another user.'
        );
    } else {
        await lockMarker(markerString);
        res.status(200).end();
    }
});

app.post('/unlockMarker', async (req, res) => {
    const markerString = req.body.markerString;
    console.log('unlocking marker');

    await unlockMarker(markerString);
    res.status(200).end();
});

server.listen(3333, () => {
    console.log('listening on *:3333');
});
