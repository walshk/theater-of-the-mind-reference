import express from 'express';
import session from 'express-session';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import {
    addMarker,
    getMarkers,
    updateMarker,
    removeMarker,
    updateMarkerTraits,
    addNormalRollToLog,
    getNormalRolls,
} from './eventController.js';

const sessionMiddleware = session({
    secret: 'test-secret', // TODO: change secret
    resave: true,
    saveUninitialized: true,
});

const app = express();

app.use(bodyParser.json());
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
    const playerId = req.body.playerId;

    req.session.gameId = gameId;
    req.session.playerId = playerId;

    res.status(200).end();
});

io.on('connection', async (socket) => {
    const gameId = socket.handshake.query.gameId + '::' ?? '';
    const playerId = decodeURIComponent(socket.handshake.query.playerId);

    socket.on('normalRoll', async (rollString) => {
        const defaultPlayerId = '++defaultPlayerId++';
        const updatedRollString = rollString.replace(defaultPlayerId, playerId);
        io.emit(`${gameId}normalRoll`, updatedRollString);
        await addNormalRollToLog(io, updatedRollString, gameId);
    });

    socket.on('getNormalRolls', async () => {
        await getNormalRolls(socket, gameId);
    });

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
