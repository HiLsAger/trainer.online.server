import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { AppAbility, CaslAbilityFactory } from "./casl-ability.factory";
import { Reflector } from "@nestjs/core";
import { AuthGuardService } from "../auth/auth.guard.service";
import { FastifyRequest } from "fastify";
import { AuthToken } from "src/module/datebase/models/authTokens.model";
import { AuthHelper } from "src/core/helpers/auth.helper";

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = "check_policy";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly authGuardService: AuthGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandler =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { authorization } = context
      .switchToHttp()
      .getRequest<FastifyRequest & { token: AuthToken }>().headers;

    const ability = this.caslAbilityFactory.createForUser(
      await this.authGuardService.getUserPermission(
        AuthHelper.removeBearer(authorization),
      ),
    );

    const isAllowed = policyHandler.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );

    if (!isAllowed) {
      throw new ForbiddenException("У вас недостаточно прав для доступа");
    }

    return isAllowed;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler == "function") return handler(ability);
    return handler.handle(ability);
  }
}

export const Permission = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
