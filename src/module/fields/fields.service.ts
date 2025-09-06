import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../datebase/models/user.model";
import { AuthToken } from "../datebase/models/authTokens.model";
import PermissionService from "../guards/permission/permission.service";
import { Role } from "../datebase/models/role.model";
import { Permission } from "../datebase/models/permission.model";

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
    @InjectModel(Role) private readonly modelRole: typeof Role,
    @InjectModel(Permission) private readonly modelPermission: typeof Permission,
    private readonly permissionService: PermissionService,
  ) {}

  public async getData(table: string): Promise<object> {
    switch (table) {
      case Role.tableName:
        return this.modelRole
          .findAll({
            attributes: ["id", "name"],
            raw: true,
          })
          .then((items) => this.arrayMap(items, "id", "name"));
      case Permission.tableName:
        return this.modelPermission
          .findAll({
            attributes: ["id", "name"],
            raw: true,
          })
          .then((items) => this.arrayMap(items, "id", "name"));
      default:
        return [];
    }
  }

  protected arrayMap(
    data: object[],
    index: string,
    value: string,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    data.forEach((item: Record<string, any>) => {
      result[item[index]] = item[value];
    });

    return result;
  }
}
