import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Redis client class
 */

class RedisClient {
    constructor() {
	this.client = createClient();
	this.isConnected = false;

	this.client.on('connect', () => {
	   this.isConnected = true;
	});

	this.client.on('error', (err) => {
	  console.log('Redis Client Error', err);
	});
	
	this.asyncSetX = promisify(this.client.setex).bind(this.client);
	this.asyncGet = promisify(this.client.get).bind(this.client);
	this.asyncDel = promisify(this.client.del).bind(this.client);
	this.asyncExpire = promisify(this.client.expire).bind(this.client);
    }

    /**
     * checks if client is alive with ping.
     *
     * @return {boolen}
     */
    isAlive() {
	return this.isConnected;
    }

    set(key, value, expiry) {
	return this.asyncSetX(key, expiry, value);
    }

    get(key) {
      return this.asyncGet(key);
    }

    del(key) {
      return this.asyncDel(key);
    }
};

const redisClient = new RedisClient();
export default redisClient;
