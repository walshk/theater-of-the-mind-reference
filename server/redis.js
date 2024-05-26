import { createClient } from 'redis';

const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
const REDIS_PORT = process.env.REDIS_PORT ?? 6379;
const client = createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

async function dbSet(key, val) {
    if (key.includes('saved-die-roll::')) {
        await client.setEx(key, 43200, val); // set keys for die rolls to expire after 12 hours
    } else {
        await client.setEx(key, 31536000, val); // set other keys to expire after 1 year
    }
    return true;
}

async function dbGet(key) {
    const val = await client.get(key);
    return val;
}

async function dbGetMultiple(keys) {
    const values = await client.mGet(keys);
    return values;
}

async function dbKeys(pattern) {
    const keys = await client.keys(pattern);
    return keys;
}

async function dbDelete(key) {
    await client.del(key);
    return true;
}

export { dbGet, dbGetMultiple, dbSet, dbDelete, dbKeys, client };
