import md5 from "md5-hash";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  Unique,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  Default,
} from "sequelize-typescript";
import { AuthToken } from "./authTokens.model";
import { Role } from "./role.model";

@Table({ tableName: "users", createdAt: "created_at", updatedAt: "updated_at" })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  login: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  get hash(): string {
    return this.getDataValue("hash");
  }
  set hash(value: string) {
    this.setDataValue("hash", md5(value));
  }

  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  status: string;

  @BelongsTo(() => Role)
  role: Role;
  @ForeignKey(() => Role)
  @AllowNull(false)
  @Default(1)
  @Column(DataType.INTEGER)
  role_id: number;

  @HasMany(() => AuthToken)
  authTokens?: NonAttribute<AuthToken[]>;

  @Column(DataType.VIRTUAL)
  get roleName(): string {
    return this.role ? this.role.name : null; // Возвращает имя роли или null, если роли нет
  }
}
