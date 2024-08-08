import { InjectModel } from '@nestjs/sequelize';
import { AuthTocken } from 'src/module/datebase/models/authTokens.model';
import { Permission } from 'src/module/datebase/models/permission.model';
import { Role } from 'src/module/datebase/models/role.model';
import { User } from 'src/module/datebase/models/user.model';

export class AuthGuardService {
  constructor(
    @InjectModel(AuthTocken) private readonly modelAuthToken: typeof AuthTocken,
  ) {}

  async check(token: string) {
    const data = await this.modelAuthToken.findOne({
      where: { token: token },
      include: [
        {
          model: User,
          include: [{ model: Role, include: [{ model: Permission }] }],
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
    console.log(data.user);
    return data.user;
  }
}
