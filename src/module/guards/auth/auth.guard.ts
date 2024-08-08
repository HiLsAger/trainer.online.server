import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthTocken } from 'src/module/datebase/models/authTokens.model';
import { AuthGuardService } from '../services/auth.guard.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest & { token: AuthTocken }>();

    const { authorization } = request.headers;
    if (!authorization)
      throw new UnauthorizedException('Токен авторизации отсутствует');
    const data = await this.auth.check(authorization as string);
    if (!data)
      throw new UnauthorizedException(
        'Данный токен авторизации не зарегистрирован в системе',
      );
    else if (
      data.created_at.getTime() / 1000 + data.life_time <=
      new Date().getTime() / 1000
    )
      throw new UnauthorizedException(`Время жизни токена вышло`);

    request.token = data;
    return true;
  }
}

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.token;
  },
);
