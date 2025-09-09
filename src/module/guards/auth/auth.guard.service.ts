import { InjectModel } from "@nestjs/sequelize";
import { AuthToken } from "src/module/database/models/authTokens.model";
import { Permission } from "src/module/database/models/permission.model";
import { Role } from "src/module/database/models/role.model";
import { RolePermission } from "src/module/database/models/rolePermission.model";
import { User } from "src/module/database/models/user.model";

export class AuthGuardService {
  constructor(
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
  ) {}

  async check(token: string): Promise<AuthToken> {
    const data = await this.modelAuthToken.findOne({
      where: { token: token },
      include: [
        {
          model: User,
          include: [
            {
              model: Role,
              include: [
                { model: Permission },
                {
                  model: RolePermission,
                  include: [{ model: Permission }],
                },
              ],
            },
          ],
        },
      ],
    });
    return data;
  }

  async getUserPermission(token: string): Promise<User> {
    const data = await this.modelAuthToken.findOne({
      where: { token: token },
      include: [
        {
          model: User,
          include: [
            {
              model: Role,
              include: [Permission],
            },
          ],
        },
      ],
    });
    return data.user;
  }
}
