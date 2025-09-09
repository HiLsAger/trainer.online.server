import { CreationAttributes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../models/role.model";

export class RoleInput implements CreationAttributes<Role> {
  @ApiProperty({ description: "Наименование" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Описание" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: "Права группы" })
  @IsArray()
  @IsOptional()
  permissions: number[];
}
