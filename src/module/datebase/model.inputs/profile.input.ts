import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProfileEdit {
  @ApiProperty({ description: "ID пользователя" })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ description: "Новый статус пользователя" })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: "Новое имя пользователя" })
  @IsString()
  @IsOptional()
  name?: string;
}
