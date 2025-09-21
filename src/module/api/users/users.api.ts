import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api.facade";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../database/models/user.model";
import RoleTypeStorage from "../../../storage/roleType.storage";
import { Role } from "../../database/models/role.model";
import ApiAbstract from "../api.abstract";

@Injectable()
export default class UsersApi extends ApiAbstract {
  constructor(
    @Inject(forwardRef(() => ApiFacade)) protected api: ApiFacade,
    @InjectModel(User) protected readonly userModel: typeof User,
  ) {
    super();
  }

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
}
