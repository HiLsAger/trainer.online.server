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
  tableName: "registers_trainings",
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class RegisterTraining extends Model<
  InferAttributes<RegisterTraining>,
  InferCreationAttributes<RegisterTraining>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
}
