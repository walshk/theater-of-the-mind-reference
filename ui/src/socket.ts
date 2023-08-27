import { io } from 'socket.io-client';

const URL = `https://${window.location.host}`;

const socket = io(URL);

socket.on('connect', () => {
    console.log('connected to server');
    socket.emit('getMarkers');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

export default socket;
