import express from 'express';
import session from 'express-session';
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

const sessionMiddleware = session({
    secret: 'test-secret', // TODO: change secret
    resave: true,
    saveUninitialized: true,
});

const app = express();
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:8080',
    })
);

app.use(sessionMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
io.engine.use(sessionMiddleware);

app.post('/join/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    req.session.gameId = gameId;

    res.status(200).end();
});

io.on('connection', async (socket) => {
    const gameId = socket.handshake.query.gameId + '::' ?? '';

    socket.on('addMarker', async (markerString) => {
        await addMarker(socket, markerString, gameId);
    });

    socket.on('getMarkers', async () => {
        await getMarkers(socket, gameId);
    });

    socket.on('moveMarker', async (markerMovementString) => {
        await updateMarker(socket, markerMovementString, gameId);
    });

    socket.on('updateMarkerTraits', async (markerString) => {
        await updateMarkerTraits(socket, markerString, gameId);
    });

    socket.on('removeMarker', async (markerId) => {
        await removeMarker(socket, markerId, gameId);
    });
});

server.listen(3333, () => {
    console.log('listening on *:3333');
});
