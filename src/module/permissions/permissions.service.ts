import { InjectModel } from "@nestjs/sequelize";
import { Permission } from "../datebase/models/permission.model";
import { AuthToken } from "../datebase/models/authTokens.model";
import ListStorage from "../../storage/list.storage";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import PermissionsHelper from "./permissions.helper";
import { Injectable } from "@nestjs/common";
import Form from "../../packages/forms/interfaces/form.interface";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly modelPermission: typeof Permission,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
  ) {}

  public async getGrid(
    limit: number = 50,
    page: number = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: Filter | null,
  ): Promise<Grid> {
    limit =
      limit <= ListStorage.maxListItems ? limit : ListStorage.maxListItems;

    const permissions = await Permission.findAll({
      attributes: ["id", "name", "description"],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    return PermissionsHelper.prepareToGrid(permissions);
  }

  public async getForm(id: number): Promise<Form> {
    const item = await Permission.findOne({
      attributes: ["id", "name", "description"],
      where: { id: id },
    });

    return PermissionsHelper.prepareToForm(item);
  }
}
