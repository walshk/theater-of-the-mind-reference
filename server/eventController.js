import { dbGet, dbGetMultiple, dbSet, dbDelete, dbKeys } from './redis.js';

const MARKER_PREFIX = 'marker::';

function buildMarkerKey(markerString) {
    const markerId = JSON.parse(markerString).id;
    return `${MARKER_PREFIX}${markerId}`;
}

export async function addMarker(socket, markerString) {
    socket.broadcast.emit('addMarker', markerString);
    await dbSet(buildMarkerKey(markerString), markerString);
}

export async function getMarkers(socket) {
    const markerKeys = await dbKeys(`${MARKER_PREFIX}*`);

    if (markerKeys.length > 0) {
        const markers = await dbGetMultiple(markerKeys);

        for (let i = 0; i < markers.length; i++) {
            socket.emit('addMarker', markers[i]);
        }
    }
}

export async function removeMarker(socket, markerId) {
    console.log({
        markerId,
    });
    await dbDelete(`${MARKER_PREFIX}${markerId}`);
    console.log('should have deleted', markerId);
    socket.broadcast.emit('removeMarker', markerId);
}

export async function updateMarker(socket, markerMovementString) {
    socket.broadcast.emit('markerMoved', markerMovementString);

    const { id, x, y } = JSON.parse(markerMovementString);

    const markerKey = `${MARKER_PREFIX}${id}`;

    const existingMarkerString = await dbGet(markerKey);
    const existingMarkerData = JSON.parse(existingMarkerString);
    const newMarkerData = Object.assign(existingMarkerData, { x, y });
    const newMarkerString = JSON.stringify(newMarkerData);

    await dbSet(markerKey, newMarkerString);
}
