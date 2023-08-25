import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:3333';

const socket = io(URL);

socket.on('connect', () => {
    console.log('connected to server');
    socket.emit('getState');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

socket.on('state', (state) => {
    console.log('received state global', JSON.parse(state));
});

export default socket;
