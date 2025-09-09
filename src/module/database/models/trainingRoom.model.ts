// Complete
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
import { Schedule } from "./schedule.model";

@Table({
  tableName: "training_rooms",
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class TrainingRoom extends Model<
  InferAttributes<TrainingRoom>,
  InferCreationAttributes<TrainingRoom>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(256))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(512))
  description: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  sort: number;

  @AllowNull(false)
  @Column(DataType.STRING(7))
  color: string;

  @HasMany(() => Schedule)
  schedules?: NonAttribute<Schedule[]>;
}
