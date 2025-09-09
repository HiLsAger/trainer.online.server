import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "schedules",
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class Schedule extends Model<
  InferAttributes<Schedule>,
  InferCreationAttributes<Schedule>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
}
