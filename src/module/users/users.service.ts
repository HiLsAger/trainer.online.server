import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthToken } from "../database/models/authTokens.model";
import { Role } from "../database/models/role.model";
import UsersHelper from "./users.helper";
import ListStorage from "../../storage/list.storage";
import { UserData, UserInputForm } from "../database/model.inputs/user.input";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
  ) {}

  public async getUsersGrid(
    limit: number = 50,
    page: number = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: Filter | null,
  ): Promise<Grid> {
    limit =
      limit <= ListStorage.maxListItems ? limit : ListStorage.maxListItems;

    const users = await User.findAll({
      attributes: ["id", "login", "name", "status"],
      include: {
        model: Role,
        attributes: ["name"],
      },
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    return UsersHelper.prepareUsers(users);
  }

  public async getUsersForm(id: number): Promise<Form> {
    const user = await User.findOne({
      attributes: ["id", "login", "name", "status", "role_id"],
      include: {
        model: Role,
        attributes: ["name"],
      },
      where: { id: id },
    });

    return UsersHelper.prepareUserToForm(user);
  }

  public async updateUser(
    data: UserInputForm,
    id: number = null,
  ): Promise<UserData> {
    const user = await this.getUser(id ?? data.id);

    await user.update({
      login: data.login,
      name: data.name,
      status: data.status,
      role_id: data.role_id,
    });

    return this.prepareUser(user);
  }

  public async insertUser(data: UserInputForm): Promise<UserData> {
    const user = await this.modelUser.create({
      login: data.login,
      name: data.name,
      hash: data.password,
      status: data.status,
    });

    return this.prepareUser(user);
  }

  public async deleteUser(id: number): Promise<string> {
    await this.modelAuthToken.destroy({ where: { user_id: id } });
    await this.modelUser.destroy({ where: { id: id } });

    return "success";
  }

  protected prepareUser(user: User): UserData {
    return {
      id: user.id,
      login: user.login,
      name: user.name,
      status: user.status,
    };
  }

  protected prepareUserModel(user: User, data: UserInputForm): User {
    if (data.login) {
      user.login = data.login;
    }

    if (data.name) {
      user.name = data.name;
    }

    if (data.status) {
      user.status = data.status;
    }

    return user;
  }

  protected async getUser(id: number): Promise<User> {
    return await User.findOne({
      where: { id: id },
    });
  }
}
