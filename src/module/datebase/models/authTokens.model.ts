import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
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
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';
import * as crypto from 'crypto';

@Table({ tableName: 'auth_tokens', createdAt: 'created_at', updatedAt: false })
export class AuthTocken extends Model<
  InferAttributes<AuthTocken>,
  InferCreationAttributes<AuthTocken>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(128),
    defaultValue: () => {
      return crypto
        .randomBytes(Math.ceil(32 / 2))
        .toString('hex')
        .slice(0, 32);
    },
  })
  token: string;

  @AllowNull(false)
  @Column(DataType.STRING(15))
  get ip(): string {
    return this.getDataValue('ip');
  }
  set ip(value: string) {
    this.setDataValue('ip', value);
  }

  @Column(DataType.DATE)
  created_at: Date;

  @AllowNull(false)
  @Column({
    type: DataType.BIGINT,
    defaultValue: () => {
      return 2592000; // 30 дней
    },
  })
  life_time: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
