import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private logger: Logger = new Logger(RedisService.name);
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    this.logger.log({ msg: `GET ${key} from REDIS` });
    return await this.cache.get(key);
  }

  async set(key: string, value: unknown) {
    this.logger.log({ msg: `SET ${key} from REDIS` });
    await this.cache.set(key, value);
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
