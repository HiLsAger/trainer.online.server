import {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { RolePermission } from "./rolePermission.model";
import { Role } from "./role.model";

@Table({ tableName: "permissions", createdAt: false, updatedAt: false })
export class Permission extends Model<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(1024))
  description: string;

  @BelongsToMany(() => Role, () => RolePermission)
  roles?: NonAttribute<Role[]>;
}
