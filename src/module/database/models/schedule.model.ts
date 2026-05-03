import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Training } from "./training.model";
import { TrainingRoom } from "./trainingRoom.model";

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

  @ForeignKey(() => Training)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  training_id: number;

  @ForeignKey(() => TrainingRoom)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  training_room_id: number;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  price: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  start_date: string;

  @AllowNull(false)
  @Column(DataType.TIME)
  start_time: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  end_date: string;

  @AllowNull(true)
  @Default(1)
  @Column(DataType.BOOLEAN)
  always: boolean;

  @AllowNull(false)
  @Default(1)
  @Column(DataType.INTEGER)
  count_cell: number;

  @BelongsTo(() => Training)
  training: Training;

  @BelongsTo(() => TrainingRoom)
  trainingRoom: TrainingRoom;
}
