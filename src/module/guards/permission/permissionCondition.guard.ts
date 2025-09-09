import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { AuthToken } from "src/module/database/models/authTokens.model";

export const AllowUseProperty = createParamDecorator(
  (
    data: {
      permissionAbility: string;
      allowedCondition: string;
      exceptionMessage: string | null;
    },
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const token: AuthToken = request.token;
    const allowedCondition = data.allowedCondition;

    token.user.role.rolePermissions.forEach((rolePermission) => {
      console.log(rolePermission.permission);
      if (
        rolePermission.permission.name === data.permissionAbility &&
        rolePermission.condition === allowedCondition
      ) {
        return request.body.userId ? request.body.userId : null;
      }
    });

    throw new ForbiddenException(
      data.exceptionMessage
        ? data.exceptionMessage
        : `У вас нет прав для выполнения этого действия`,
    );
  },
);
