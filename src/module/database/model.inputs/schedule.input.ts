import { CreationAttributes } from "sequelize";
import { Schedule } from "../models/schedule.model";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export default class ScheduleInput implements CreationAttributes<Schedule> {
  @ApiProperty({ description: "ID записи" })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: "Дата окончания тренировки дд.мм.гггг" })
  @IsString()
  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
    message: "Дата окончания должна быть в формате дд.мм.гггг",
  })
  end_date: string;

  @ApiProperty({ description: "Дата старта тренировки дд.мм.гггг" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
    message: "Дата старта должна быть в формате дд.мм.гггг",
  })
  start_date: string;

  @ApiProperty({ description: "Время старта тренировки чч:мм" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Время старта должно быть в формате чч:мм",
  })
  start_time: string;

  @ApiProperty({ description: "ID тренировки" })
  @IsNumber()
  @IsNotEmpty()
  training_id: number;

  @ApiProperty({ description: "ID зала" })
  @IsNumber()
  @IsNotEmpty()
  training_room_id: number;

  @ApiProperty({
    description: "Необходимо ли дублировать тренировку на каждую неделю",
  })
  @IsBoolean()
  @IsNotEmpty()
  always: boolean;

  @ApiProperty({
    description:
      "Количество времени count_cell * {Период секций времени в минутах}",
  })
  @IsNumber()
  @IsNotEmpty()
  count_cell: number;

  @ApiProperty({ description: "Цена" })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
