import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../datebase/models/user.model";
import { AuthToken } from "../datebase/models/authTokens.model";
import { Filter, Grid } from "./users.intefrace";
import { Role } from "../datebase/models/role.model";
import UsersHelper from "./users.helper";
import { Form } from "../../components/form/form.interface";
import ListStorage from "../../storage/list.storage";

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
}
