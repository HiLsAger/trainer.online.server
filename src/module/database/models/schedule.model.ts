import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  AllowNull,
  AutoIncrement, BeforeCreate, BeforeUpdate,
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

export enum DayOfWeek {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

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

  @AllowNull(false)
  @Column(DataType.TIME)
  duration: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  end_date: string;

  @AllowNull(true)
  @Default(1)
  @Column(DataType.BOOLEAN)
  always: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(DayOfWeek)),
    defaultValue: DayOfWeek.MONDAY,
  })
  day_of_week: DayOfWeek;

  @BelongsTo(() => Training)
  training: Training;

  @BelongsTo(() => TrainingRoom)
  trainingRoom: TrainingRoom;

  @BeforeCreate
  static setDayOfWeekOnCreate(instance: Schedule) {
    if (instance.start_date) {
      instance.day_of_week = instance.getDayOfWeekFromDate(instance.start_date);
    }
  }

  @BeforeUpdate
  static setDayOfWeekOnUpdate(instance: Schedule) {
    if (instance.changed("start_date")) {
      instance.day_of_week = instance.getDayOfWeekFromDate(instance.start_date);
    }
  }

  protected getDayOfWeekFromDate(dateString: string): DayOfWeek {
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    const dayMap: Record<number, DayOfWeek> = {
      0: DayOfWeek.SUNDAY,
      1: DayOfWeek.MONDAY,
      2: DayOfWeek.TUESDAY,
      3: DayOfWeek.WEDNESDAY,
      4: DayOfWeek.THURSDAY,
      5: DayOfWeek.FRIDAY,
      6: DayOfWeek.SATURDAY,
    };

    return dayMap[dayIndex];
  }
}
