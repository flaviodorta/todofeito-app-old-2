import { RedisOptions } from 'ioredis';
import { config } from '../config';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export const cacheConfig = {
  config: {
    redis: {
      host: config.redis_host,
      port: config.redis_pass,
      password: config.redis_pass || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig;
