import {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Training } from "./training.model";

@Table({
  tableName: "styles",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Style extends Model<
  InferAttributes<Style>,
  InferCreationAttributes<Style>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(128))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(7))
  background_color: string;

  @AllowNull(true)
  @Column(DataType.STRING(7))
  color: string;

  @AllowNull(true)
  @Column(DataType.STRING(32))
  font_size: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  css: string;

  @HasMany(() => Training)
  trainings?: NonAttribute<Training[]>;
}
