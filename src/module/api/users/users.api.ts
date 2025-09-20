import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api.facade";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../database/models/user.model";
import RoleTypeStorage from "../../../storage/roleType.storage";
import { Role } from "../../database/models/role.model";

@Injectable()
export default class UsersApi {
  constructor(
    @Inject(forwardRef(() => ApiFacade)) protected api: ApiFacade,
    @InjectModel(User) protected readonly userModel: typeof User,
  ) {}

  public async getTrainers(): Promise<Record<string, string>> {
    return this.userModel
      .findAll({
        attributes: ["id", "name"],
        include: {
          model: Role,
          where: { type: RoleTypeStorage.RoleTypes.trainer },
        },
      })
      .then((users) => this.arrayMap(users, "id", "name"));
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
