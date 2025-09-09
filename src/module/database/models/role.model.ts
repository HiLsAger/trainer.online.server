import {
  CreateOptions,
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
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { RolePermission } from "./rolePermission.model";
import { User } from "./user.model";
import { Permission } from "./permission.model";

@Table({
  tableName: "role_groups",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
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
  description?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  system: boolean;

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions?: NonAttribute<Permission[]>;

  @HasMany(() => RolePermission)
  rolePermissions?: NonAttribute<RolePermission[]>;

  @HasMany(() => User)
  users?: NonAttribute<User[]>;
}
