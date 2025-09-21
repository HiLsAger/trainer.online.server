// Complete
import {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Training } from "./training.model";
import { Style } from "./style.model";

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

  @ForeignKey(() => Style)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  style_id: number;

  @BelongsTo(() => Style)
  style: Style;

  // @HasMany(() => Schedule)
  // schedules?: NonAttribute<Schedule[]>;
}
