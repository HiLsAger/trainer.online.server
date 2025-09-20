import { CreationAttributes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Role } from "../models/role.model";
import { Transform } from "class-transformer";

export class RoleInput implements CreationAttributes<Role> {
  @ApiProperty({ description: "Наименование" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Описание" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: "Тип пользователя" })
  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsOptional()
  type: number;

  @ApiProperty({ description: "Права группы" })
  @IsArray()
  @IsOptional()
  permissions: number[];
}
