import { Injectable } from "@nestjs/common";
import { User } from "src/module/database/models/user.model";

@Injectable()
export default class PermissionService {
  public validateCondition(
    user: User,
    permissionAbility: string,
    allowedCondition: string,
  ): boolean {
    const userRolePermissions = user.role.rolePermissions;

    return userRolePermissions.some((rolePermission) => {
      return (
        rolePermission.permission.name === permissionAbility &&
        rolePermission.condition === allowedCondition
      );
    });
  }
}
