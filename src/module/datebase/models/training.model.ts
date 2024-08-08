// Complete
import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Schedule } from './schedule.model';

@Table({
  tableName: 'trainings',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Training extends Model<
  InferAttributes<Training>,
  InferCreationAttributes<Training>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(512))
  description: string;

  @AllowNull(false)
  @Column(DataType.STRING(7))
  color: string;

  @HasMany(() => Schedule)
  schedules?: NonAttribute<Schedule[]>;
}
