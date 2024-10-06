import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../datebase/models/user.model";
import { AuthToken } from "../datebase/models/authTokens.model";
import { Filter } from "./users.intefrace";
import { ListStorage } from "../../storage/list.storage";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
  ) {}

  public async getUsers(
    limit: number = 50,
    page: number = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: Filter | null,
  ): Promise<User[]> {
    limit =
      limit <= ListStorage.maxListItems ? limit : ListStorage.maxListItems;

    return await User.findAll({
      offset: (page - 1) * limit,
      limit: Number(limit),
    });
  }
}
