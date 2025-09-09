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
  tableName: "subscriptions",
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class Subscription extends Model<
  InferAttributes<Subscription>,
  InferCreationAttributes<Subscription>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
}
