import {
    dbSetAdd,
    dbSetRemove,
    dbSetMembers,
    MARKER_SET_KEY,
} from './redis.js';

export async function addMarker(socket, markerString) {
    socket.broadcast.emit('addMarker', markerString);
    await dbSetAdd(MARKER_SET_KEY, markerString);
}

export async function getMarkers(socket) {
    const markers = await dbSetMembers(MARKER_SET_KEY);
    for (let i = 0; i < markers.length; i++) {
        socket.emit('addMarker', markers[i]);
    }
}

export async function removeMarker(socket, markerId) {
    const allMarkers = await dbSetMembers(MARKER_SET_KEY);
    const existingMarkerString = allMarkers.find((m) => m.includes(markerId));

    const isLocked = await isMarkerLocked(existingMarkerString);
    if (isLocked) {
        socket.emit(
            'markerError',
            'Unable to remove marker. It is currently being moved by another user.'
        );
    } else {
        socket.broadcast.emit('removeMarker', markerId);
        await dbSetRemove(MARKER_SET_KEY, existingMarkerString);
    }
}

export async function updateMarker(socket, markerMovementString) {
    socket.broadcast.emit('markerMoved', markerMovementString);

    const { id, x, y } = JSON.parse(markerMovementString);

    const allMarkers = await dbSetMembers(MARKER_SET_KEY);
    const existingMarkerString = allMarkers.find((m) => m.includes(id));

    if (!existingMarkerString) {
        return;
    }

    const existingMarkerData = JSON.parse(existingMarkerString);
    const newMarkerData = Object.assign(existingMarkerData, { x, y });

    const newMarkerString = JSON.stringify(newMarkerData);
    await dbSetRemove(MARKER_SET_KEY, existingMarkerString);
    await dbSetAdd(MARKER_SET_KEY, newMarkerString);
}
