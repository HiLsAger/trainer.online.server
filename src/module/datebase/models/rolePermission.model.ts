import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Conditions } from "src/module/guards/permission/strorage/condition.strorage";

@Table({
  tableName: "roles_permissions",
  createdAt: "created_at",
  updatedAt: false,
})
export class RolePermission extends Model<
  InferAttributes<RolePermission>,
  InferCreationAttributes<RolePermission>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  role_id: number;

  @BelongsTo(() => Permission)
  permission: Permission;

  @ForeignKey(() => Permission)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  permission_id: number;

  @AllowNull(false)
  @Column(DataType.ENUM("self", "%"))
  condition: string;
}
