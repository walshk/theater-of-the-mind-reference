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
        origin: 'http://localhost:8080',
    })
);

app.use(sessionMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    },
});
io.engine.use(sessionMiddleware);

app.post('/create/:gameId', (req, res) => {
    const gameId = req.params.gameId;
});

app.post('/join/:gameId', (req, res) => {
    const gameId = req.params.gameId;

    // TODO: check if game exists with game id
});

io.on('connection', async (socket) => {
    const user = socket.request.session.id;

    socket.on('addMarker', async (markerString) => {
        console.log('marker added by ', user);
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
