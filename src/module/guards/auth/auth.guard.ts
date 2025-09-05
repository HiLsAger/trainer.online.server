import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { AuthToken } from "src/module/datebase/models/authTokens.model";
import { AuthGuardService } from "./auth.guard.service";
import { AuthHelper } from "src/system/helpers/auth.helper";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest & { token: AuthToken }>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException("Токен авторизации отсутствует");
    }

    const data = await this.auth.check(AuthHelper.removeBearer(authorization));
    if (!data) {
      throw new UnauthorizedException(
        "Данный токен авторизации не зарегистрирован в системе",
      );
    } else if (
      data.created_at.getTime() / 1000 + data.life_time <=
      new Date().getTime() / 1000
    ) {
      throw new UnauthorizedException(`Время жизни токена вышло`);
    }

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
