// Complete
import {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Schedule } from './schedule.model';

@Table({
  tableName: 'times',
  createdAt: 'created_at',
})
export class Time extends Model<
  InferAttributes<Time>,
  InferCreationAttributes<Time>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(10))
  start_time: string;

  @AllowNull(false)
  @Column(DataType.STRING(10))
  end_time: string;

  @HasMany(() => Schedule)
  schedules?: NonAttribute<Schedule[]>;
}
