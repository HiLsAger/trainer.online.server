import { CreationAttributes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Training } from "../models/training.model";
import { Transform } from "class-transformer";

export class TrainingInput implements CreationAttributes<Training> {
  @ApiProperty({ description: "Наименование" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Описание" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: "Стиль" })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNotEmpty()
  style_id: number;
}
