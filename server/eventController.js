import { dbGet, dbGetMultiple, dbSet, dbDelete, dbKeys } from './redis.js';

const MARKER_PREFIX = 'marker::';

function buildMarkerKey(gameId, markerString) {
    const markerId = JSON.parse(markerString).id;
    return `${gameId}${MARKER_PREFIX}${markerId}`;
}

export async function addMarker(socket, markerString, gameId = '') {
    socket.broadcast.emit(`${gameId}addMarker`, markerString);
    await dbSet(buildMarkerKey(gameId, markerString), markerString);
}

export async function getMarkers(socket, gameId = '') {
    const markerKeys = await dbKeys(`${gameId}${MARKER_PREFIX}*`);

    if (markerKeys.length > 0) {
        const markers = await dbGetMultiple(markerKeys);

        for (let i = 0; i < markers.length; i++) {
            socket.emit(`${gameId}addMarker`, markers[i]);
        }
    }
}

export async function removeMarker(socket, markerId, gameId = '') {
    await dbDelete(`${gameId}${MARKER_PREFIX}${markerId}`);
    socket.broadcast.emit(`${gameId}removeMarker`, markerId);
}

export async function updateMarker(socket, markerMovementString, gameId = '') {
    socket.broadcast.emit(`${gameId}markerMoved`, markerMovementString);

    const { id, x, y } = JSON.parse(markerMovementString);

    const markerKey = `${gameId}${MARKER_PREFIX}${id}`;

    const existingMarkerString = await dbGet(markerKey);
    const existingMarkerData = JSON.parse(existingMarkerString);
    const newMarkerData = Object.assign(existingMarkerData, { x, y });
    const newMarkerString = JSON.stringify(newMarkerData);

    await dbSet(markerKey, newMarkerString);
}

export async function updateMarkerTraits(socket, markerString, gameId = '') {
    socket.broadcast.emit(`${gameId}updateMarkerTraits`, markerString);

    const markerWithUpdates = JSON.parse(markerString);

    const markerKey = `${gameId}${MARKER_PREFIX}${markerWithUpdates.id}`;

    const existingMarkerString = await dbGet(markerKey);
    const existingMarkerData = JSON.parse(existingMarkerString);
    const newMarkerData = Object.assign(existingMarkerData, markerWithUpdates);
    const newMarkerString = JSON.stringify(newMarkerData);

    await dbSet(markerKey, newMarkerString);
}

export async function addNormalRollToLog(io, rollString, gameId = '') {
    const timestamp = Date.now();
    io.emit(
        `${gameId}addNormalRollToLog`,
        `${rollString}::timestamp::${timestamp}`
    );
    const rollKey = `${gameId}saved-die-roll::${timestamp}`;

    await dbSet(rollKey, `${rollString}::timestamp::${timestamp}`);
}

export async function getNormalRolls(socket, gameId = '') {
    const rollKeys = await dbKeys(`${gameId}saved-die-roll::*`);

    if (rollKeys.length > 0) {
        const rolls = await dbGetMultiple(rollKeys);
        rolls.sort((keyA, keyB) => {
            const timeA = +keyA.split('::timestamp::').at(-1);
            const timeB = +keyB.split('::timestamp::').at(-1);
            return timeA - timeB;
        });

        for (let i = 0; i < rolls.length; i++) {
            socket.emit(`${gameId}addNormalRollToLog`, rolls[i]);
        }
    }
}
