import { CreationAttributes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Style } from "../models/style.model";

export class StyleInput implements CreationAttributes<Style> {
  @ApiProperty({ description: "Наименование" })
  @IsString()
  @Length(2, 128)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Задний фон" })
  @IsString()
  @Length(0, 7)
  background_color: string;

  @ApiProperty({ description: "Цвет текста" })
  @IsString()
  @Length(0, 7)
  color: string;

  @ApiProperty({ description: "Размер шрифта" })
  @IsString()
  @Length(0, 7)
  font_size: string;

  @ApiProperty({ description: "CSS стили поля" })
  @IsString()
  css: string;
}
