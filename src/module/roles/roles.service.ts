import { InjectModel } from "@nestjs/sequelize";
import { Permission } from "../database/models/permission.model";
import { AuthToken } from "../database/models/authTokens.model";
import ListStorage from "../../storage/list.storage";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import RolesHelper from "./roles.helper";
import { Injectable } from "@nestjs/common";
import Form from "../../packages/forms/interfaces/form.interface";
import { Role } from "../database/models/role.model";
import { RoleInput } from "../database/model.inputs/role.input";
import { RolePermission } from "../database/models/rolePermission.model";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly modelRole: typeof Role,
    @InjectModel(RolePermission)
    private readonly modelRolePermission: typeof RolePermission,
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

    const items = await Role.findAll({
      attributes: ["id", "name", "description"],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    return RolesHelper.prepareToGrid(items);
  }

  public async getForm(id: number): Promise<Form> {
    const item = await Role.findOne({
      attributes: ["id", "name", "description"],
      where: { id: id },
      include: {
        model: Permission,
      },
    });

    return RolesHelper.prepareToForm(item);
  }

  public async update(data: RoleInput, id: number): Promise<RoleInput> {
    const role = await this.getRole(id);

    await role.update({
      name: data.name,
      description: data.description,
    });

    await this.modelRolePermission.destroy({
      where: { role_id: id },
    });

    await this.createRolesPermissions(id, data.permissions);

    return RolesHelper.prepareRole(await this.getRole(id));
  }

  public async insert(data: RoleInput): Promise<RoleInput> {
    const role = await this.modelRole.create({
      name: data.name,
      description: data.description,
    });

    await this.createRolesPermissions(role.id, data.permissions);

    return RolesHelper.prepareRole(await this.getRole(role.id));
  }

  public async delete(id: number): Promise<string> {
    await this.modelRolePermission.destroy({
      where: { role_id: id },
    });

    await this.modelRole.destroy({
      where: { id: id },
    });

    return "success";
  }

  protected async getRole(id: number): Promise<Role> {
    return await Role.findOne({
      where: { id: id },
      include: {
        model: Permission,
      },
    });
  }

  protected async createRolesPermissions(
    roleId: number,
    permissions: number[],
  ): Promise<void> {
    if (!permissions || permissions.length <= 0) {
      return;
    }
    const rolePermissionsData = permissions.map((permissionId: number) => ({
      role_id: roleId,
      permission_id: permissionId,
      condition: "%",
    }));

    await this.modelRolePermission.bulkCreate(rolePermissionsData);
  }
}
