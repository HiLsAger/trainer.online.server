import { CreationAttributes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { TrainingRoom } from "../models/trainingRoom.model";

export class TrainingRoomsInput implements CreationAttributes<TrainingRoom> {
  @ApiProperty({ description: "Наименование" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Описание" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: "Порядок сортировки" })
  @IsNumber()
  @IsOptional()
  sort: number;

  @ApiProperty({ description: "Стиль" })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNotEmpty()
  style_id: number;
}
