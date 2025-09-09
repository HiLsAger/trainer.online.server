import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthToken } from "../database/models/authTokens.model";
import { Profile } from "./profile.interface";
import { Role } from "../database/models/role.model";
import PermissionService from "../guards/permission/permission.service";
import profilePermissions from "../guards/permission/permissions/profile.permission";
import { ProfileEdit } from "../database/model.inputs/profile.input";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
    private readonly permissionService: PermissionService,
  ) {}

  async getProfileByLogin(login: string): Promise<Profile | null> {
    const userModel = await this.getUserByLogin(login);
    return this.prepareProfile(userModel);
  }

  async editProfileInfo(user: User, body: ProfileEdit): Promise<Profile> {
    if (
      body.userId &&
      !this.permissionService.validateCondition(
        user,
        profilePermissions.EditStatus,
        "%",
      )
    ) {
      throw new ForbiddenException(
        "Не достаточный уровень доступа, для редактирования чюжой зааписи",
      );
    }

    await this.modelUser.update(this.rebuildEditProfileData(body), {
      where: { id: body.userId ? body.userId : user.id },
    });

    const userModel = await this.getUserByLogin(user.login);
    return this.prepareProfile(userModel);
  }

  private async getUserByLogin(login: string): Promise<User> {
    return await this.modelUser.findOne({
      where: {
        login: login,
      },
      include: {
        model: Role,
      },
      rejectOnEmpty: new NotFoundException("Пользователь не найден"),
    });
  }

  private prepareProfile(user: User): Profile {
    return {
      name: user.name,
      role: user.role.name,
      status: user.status,
    };
  }

  private rebuildEditProfileData(data: ProfileEdit): ProfileEdit {
    const updateData: ProfileEdit = {
      status: null,
      name: null,
    };

    if (data.status !== null) {
      updateData.status = data.status;
    }

    if (data.name !== null && data.name !== "") {
      updateData.name = data.name;
    }

    if (!updateData) {
      throw new Error(`Необходимо заполнить хотя бы одно поле status или name`);
    }

    return updateData;
  }
}
