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

  @ApiProperty({ description: "Дата окончания тренировки гггг-мм-дд" })
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: "Дата окончания должна быть в формате гггг-мм-дд",
  })
  end_date: string;

  @ApiProperty({ description: "Дата старта тренировки гггг-мм-дд" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: "Дата старта должна быть в формате гггг-мм-дд",
  })
  start_date: string;

  @ApiProperty({ description: "Время старта тренировки чч:мм" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Время старта должно быть в формате чч:мм",
  })
  start_time: string;

  @ApiProperty({ description: "Длительность тренировки чч:мм" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Длительность тренировки должна быть в формате чч:мм",
  })
  duration: string;

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

  @ApiProperty({ description: "Цена" })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
