import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { Reflector } from '@nestjs/core';
import { AuthGuardService } from '../services/auth.guard.service';
import { FastifyRequest } from 'fastify';
import { AuthTocken } from 'src/module/datebase/models/authTokens.model';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly authGuardService: AuthGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const PolicyHandler =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { authorization } = context
      .switchToHttp()
      .getRequest<FastifyRequest & { token: AuthTocken }>().headers;
    console.log(
      context
        .switchToHttp()
        .getRequest<FastifyRequest & { token: AuthTocken }>().headers,
    );

    const ability = this.caslAbilityFactory.createForUser(
      await this.authGuardService.getUserPermission(authorization),
    );

    return PolicyHandler.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler == 'function') return handler(ability);
    return handler.handle(ability);
  }
}

export const Permission = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
