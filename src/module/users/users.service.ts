import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../datebase/models/user.model";
import { AuthToken } from "../datebase/models/authTokens.model";
import { Filter, Grid } from "./users.intefrace";
import { Role } from "../datebase/models/role.model";
import UsersHelper from "./users.helper";
import { Form } from "../../components/form/form.interface";
import ListStorage from "../../storage/list.storage";
import {
  UserData,
  UserInputForm,
} from "../datebase/model.inputs/user.input";

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
      attributes: ["id", "login", "name", "status"],
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
