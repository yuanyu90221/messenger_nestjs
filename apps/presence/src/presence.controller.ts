import {
  CacheInterceptor,
  Controller,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { RedisService, SharedService } from '@app/shared';
import { PresenceService } from './presence.service';

@Controller()
export class PresenceController {
  private logger: Logger = new Logger(PresenceController.name);
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
    private readonly redisService: RedisService,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  @UseInterceptors(CacheInterceptor)
  async getUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    const foo = await this.redisService.get('foo');
    if (foo) {
      this.logger.log({ msg: 'CACHED' });
      return foo;
    }
    const f = await this.presenceService.getFoo();
    this.redisService.set('foo', f);
    return f;
  }
}
