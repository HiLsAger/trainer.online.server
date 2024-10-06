import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Schedule } from "./schedule.model";
import { RegisterTraining } from "./registerTraining.model";
import { Subscription } from "./subscription.model";

@Table({
  tableName: "statuses",
})
export class Status extends Model<
  InferAttributes<Status>,
  InferCreationAttributes<Status>
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
  @Column(DataType.STRING(256))
  value: string;

  @AllowNull(false)
  @Column(DataType.STRING(256))
  type: string;

  @AllowNull(true)
  @Column(DataType.STRING(512))
  description: string;

  @HasMany(() => Schedule)
  schedules?: NonAttribute<Schedule[]>;

  @HasMany(() => RegisterTraining)
  registeredTrainings?: NonAttribute<RegisterTraining[]>;

  @HasMany(() => Subscription)
  subscriptions?: NonAttribute<Subscription[]>;
}
