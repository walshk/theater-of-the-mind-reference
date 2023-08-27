import { io } from 'socket.io-client';

const URL =
    process.env.NODE_ENV === 'production' ? '/api/' : 'ws://localhost:3333';

const socket = io(URL);

socket.on('connect', () => {
    socket.emit('getMarkers');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

export default socket;
