import { dbSet, dbDelete, dbKeys } from './redis.js';

const MARKER_PREFIX = 'marker::';

function buildMarkerKey(markerString) {
    return `${MARKER_PREFIX}${markerString}`;
}

function getMarkerStringFromKey(key) {
    return key.substring(MARKER_PREFIX.length);
}

export async function addMarker(socket, markerString) {
    socket.broadcast.emit('addMarker', markerString);
    await dbSet(buildMarkerKey(markerString), 1);
}

export async function getMarkers(socket) {
    const markerKeys = await dbKeys(`${MARKER_PREFIX}*`);
    const markers = markerKeys.map(getMarkerStringFromKey);

    for (let i = 0; i < markers.length; i++) {
        socket.emit('addMarker', markers[i]);
    }
}

export async function removeMarker(socket, markerId) {
    const markerKeys = await dbKeys(`${MARKER_PREFIX}*`);
    const keyToDelete = markerKeys.find((k) =>
        k.includes(`"id":"${markerId}"`)
    );

    if (keyToDelete) {
        await dbDelete(keyToDelete);
    }

    socket.broadcast.emit('removeMarker', markerId);
}

export async function updateMarker(socket, markerMovementString) {
    socket.broadcast.emit('markerMoved', markerMovementString);

    const { id, x, y } = JSON.parse(markerMovementString);

    const markerKeys = await dbKeys(`${MARKER_PREFIX}*`);
    const keyToUpdate = markerKeys.find((k) => k.includes(`"id":"${id}"`));

    const markerString = getMarkerStringFromKey(keyToUpdate);
    const existingMarkerData = JSON.parse(markerString);

    const newMarkerData = Object.assign(existingMarkerData, { x, y });
    const newMarkerKey = buildMarkerKey(JSON.stringify(newMarkerData));

    await dbDelete(keyToUpdate);
    await dbSet(newMarkerKey, 1);
}
