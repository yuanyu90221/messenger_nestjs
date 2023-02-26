import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, switchMap } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}
  intercept(ctx: ExecutionContext, next: CallHandler<any>): Observable<any> {
    if (ctx.getType() !== 'http') return next.handle();

    const request = ctx.switchToHttp().getRequest();
    const authHeader: string = request.headers['authorization'];

    if (!authHeader) return next.handle();

    const authHeaderParts = authHeader.split(' ');

    if (authHeaderParts.length !== 2) return next.handle();

    const [, jwt] = authHeaderParts;
    return this.authService
      .send(
        {
          cmd: 'decode-jwt',
        },
        {
          jwt,
        },
      )
      .pipe(
        switchMap(({ user }) => {
          request.user = user;
          return next.handle();
        }),
        catchError(() => next.handle()),
      );
  }
}
