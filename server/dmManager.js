import { dbGet, dbGetMultiple, dbSet, dbDelete, dbKeys } from './redis.js';

const getGameDMKey = (gameId) => {
    return `game-dm::${gameId}::`
}

export async function getDm(gameId) {
    const dmKey = getGameDMKey(gameId);
    const dm = await dbGet(dmKey)
    return dm;
}

export async function setDm(gameId, playerId) {
    const dmKey = getGameDMKey(gameId);
    await dbSet(dmKey, playerId);
}

export async function unsetDm(gameId) {
    const dmKey = getGameDMKey(gameId);
    await dbDelete(dmKey);
}