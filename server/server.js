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
    addDmRollToLog,
    getNormalRolls,
    getDmRolls,
    addPlayerToGame,
    removePlayerFromGame,
    updatePlayerList
} from './eventController.js';

import { getDm, setDm, unsetDm } from './dmManager.js'

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

app.post('/join/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const playerId = req.body.playerId;
    const enterAsDM = req.body.enterAsDM;

    if (enterAsDM) {
        const currentDm = await getDm(gameId);
        if (currentDm && currentDm !== playerId) {
            res.status(409).send(`Player "${currentDm}" is already the DM for game "${gameId}"`);
            return;
        } else if (currentDm === playerId) {
            res.status(409).send(`Player Name "${currentDm}" is already in use by the DM of game "${gameId}". Please use a different Player Name.`)
            return;
        } else {
            await setDm(gameId, playerId);
        }
    }

    req.session.gameId = gameId;
    req.session.playerId = playerId;

    res.status(200).end();
});

io.on('connection', async (socket) => {
    const gameIdRaw = socket.handshake.query.gameId;
    const gameId = gameIdRaw ? `${gameIdRaw}::` : '';
    const playerId = decodeURIComponent(socket.handshake.query.playerId);
    const isDm = socket.handshake.query.enterAsDm;

    await addPlayerToGame(playerId, gameId);
    await updatePlayerList(io, gameId);

    if (isDm) {
        console.log(
            `Player "${playerId}" joined game "${gameIdRaw}" as the DM`
        );
    } else {
        console.log(
            `Player "${playerId}" joined game "${gameIdRaw}"`
        );
    }

    socket.on('normalRoll', async (rollString) => {
        const defaultPlayerId = '++defaultPlayerId++';
        const updatedRollString = rollString.replace(defaultPlayerId, playerId);
        io.emit(`${gameId}normalRoll`, updatedRollString);
        await addNormalRollToLog(io, updatedRollString, gameId);
    });

    socket.on('dmRoll', async (dmRollValue) => {
        io.emit(`${gameId}dmRoll`, dmRollValue);
        await addDmRollToLog(io, dmRollValue, gameId);
    })

    socket.on('getNormalRolls', async () => {
        await getNormalRolls(socket, gameId);
    });

    socket.on('getDmRolls', async () => {
        await getDmRolls(socket, gameId);
    })

    socket.on('addMarker', async (markerString) => {
        console.log(
            `Player "${playerId}" added a marker to game "${gameIdRaw}"`
        );
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
        console.log(
            `Player "${playerId}" removed a marker from game "${gameIdRaw}"`
        );
        await removeMarker(socket, markerId, gameId);
    });

    socket.on('disconnect', async () => {
        await removePlayerFromGame(playerId, gameId);
        await updatePlayerList(io, gameId);
        if (isDm) {
            console.log(`DM "${playerId}" left game "${gameIdRaw}"`);
            await unsetDm(gameIdRaw);
        } else {
            console.log(`Player "${playerId}" left game "${gameIdRaw}"`)
        }
    });

});

server.listen(3333, () => {
    console.log('listening on *:3333');
});
