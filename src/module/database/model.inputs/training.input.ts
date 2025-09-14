import { CreationAttributes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Training } from "../models/training.model";

export class TrainingInput implements CreationAttributes<Training> {
  @ApiProperty({ description: "Наименование" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Описание" })
  @IsString()
  @IsOptional()
  description: string;
}
