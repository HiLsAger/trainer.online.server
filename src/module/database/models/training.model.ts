import { InferAttributes, InferCreationAttributes } from "sequelize";
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
} from "sequelize-typescript";
import { Style } from "./style.model";
import { User } from "./user.model";

@Table({
  tableName: "trainings",
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  paranoid: true,
})
export class Training extends Model<
  InferAttributes<Training>,
  InferCreationAttributes<Training>
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
  @Column(DataType.STRING(512))
  description: string;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  trainer_id: number;

  @BelongsTo(() => User)
  Trainer: User;

  @ForeignKey(() => Style)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  style_id: number;

  @BelongsTo(() => Style)
  style: Style;
}
