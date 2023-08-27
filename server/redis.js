import { createClient } from 'redis';

const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
const REDIS_PORT = process.env.REDIS_PORT ?? 6379;
const client = createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
});

const MARKER_SET_KEY = 'data::markers';

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

async function dbSet(key, val) {
    await client.set(key, val);
}

async function dbGet(key) {
    const val = await client.get(key);
    return val;
}

async function dbSetAdd(key, values) {
    try {
        await client.sAdd(key, values);
    } catch (err) {
        console.error(`Error adding members to set ${key}: ${err.message}`);
    }
}

async function dbSetRemove(key, values) {
    try {
        await client.sRem(key, values);
    } catch (err) {
        console.error(`Error removing members from set ${key}: ${err.message}`);
    }
}

async function dbSetMembers(key) {
    try {
        const members = client.sMembers(key);
        return members;
    } catch (err) {
        console.error(`Error fetching members of set: ${err.message}`);
        return [];
    }
}

export {
    dbGet,
    dbSet,
    dbSetAdd,
    dbSetRemove,
    dbSetMembers,
    MARKER_SET_KEY,
    LOCKED_SET_KEY,
};
