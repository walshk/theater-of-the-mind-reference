import { io } from 'socket.io-client';

const URL = `http://${window.location.host}`;

const socket = io(URL);

socket.on('connect', () => {
    socket.emit('getMarkers');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

export default socket;
