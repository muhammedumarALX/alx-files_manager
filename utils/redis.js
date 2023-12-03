import {createClient} from 'redis'

class RedisClient {
    constructor() {

        const redisOptions = {
            host: '127.0.0.1',
            port: 6379,
        }

        this.client = createClient(redisOptions);

        this.client.on('error', (err) => {
            console.error(`Error in Redis client: ${err}`)
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve,reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, durationInSeconds) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, durationInSeconds, value, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }
};

const redisClient = new RedisClient();
module.exports = redisClient;