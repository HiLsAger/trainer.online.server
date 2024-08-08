import {
  CreateOptions,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { RolePermission } from './rolePermission.model';
import { User } from './user.model';
import { Permission } from './permission.model';

@Table({
  tableName: 'role_groups',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreateOptions<number>;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(1024))
  description?: string | null;

  // @HasMany(() => RolePermission)
  // rolePermissions?: NonAttribute<RolePermission[]>;
  @BelongsToMany(() => Permission, () => RolePermission)
  permissions?: NonAttribute<Permission[]>;

  @HasMany(() => User)
  users?: NonAttribute<User[]>;
}
