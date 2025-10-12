import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";

@Table({
  tableName: "settings",
  updatedAt: "updated_at",
  createdAt: false,
})
export class Setting extends Model<
  InferAttributes<Setting>,
  InferCreationAttributes<Setting>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(128))
  key: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  value: string;

  @AllowNull(false)
  @Column(DataType.STRING(128))
  group: string;

  @AllowNull(false)
  @Column(
    DataType.ENUM("string", "number", "boolean", "datetime", "array", "json"),
  )
  value_type: string;

  @AllowNull(false)
  @Column(DataType.STRING(128))
  name: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  visible: boolean;

  @AllowNull(true)
  @Default(0)
  @Column(DataType.INTEGER)
  order: number;
}
