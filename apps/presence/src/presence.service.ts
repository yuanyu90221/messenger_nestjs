import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private logger: Logger = new Logger(PresenceService.name);
  getFoo() {
    this.logger.log({ msg: 'NOT CACHED' });
    return { foo: 'bar' };
  }
}
