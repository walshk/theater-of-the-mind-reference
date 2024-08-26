import { io } from 'socket.io-client';

const URL =
    process.env.NODE_ENV === 'production'
        ? `https://${window.location.host}`
        : 'ws://localhost:3333';

const connectSocket = (
    gameId: string,
    playerId: string,
    enterAsDm: boolean
) => {
    const gameIdEncoded = encodeURIComponent(gameId);
    const playerIdEncoded = encodeURIComponent(playerId);
    const enterAsDmString = enterAsDm ? '&enterAsDm=true' : '';
    const socket = io(
        `${URL}?gameId=${gameIdEncoded}&playerId=${playerIdEncoded}${enterAsDmString}`,
        {
            withCredentials: true,
        }
    );

    socket.on('connect', () => {
        console.log(`%cGame Connected: ${gameId}`, 'color: #66ff00');
        socket.emit('getMarkers');
        socket.emit('getNormalRolls');
        socket.emit('getDmRolls');
    });

    socket.on('disconnect', () => {
        console.log(`%cGame Disconnected: ${gameId}`, 'color: #dc3545');
    });

    return socket;
};

export default connectSocket;
