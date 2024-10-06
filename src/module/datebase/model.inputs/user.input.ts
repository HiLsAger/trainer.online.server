import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserInput implements CreationAttributes<User> {
  @ApiProperty({ description: "Логин" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: "Хешированный пароль" })
  @IsString()
  @IsNotEmpty()
  hash: string;

  @ApiProperty({ description: "Имя пользователя" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UserLoginInput implements CreationAttributes<User> {
  @ApiProperty({ description: "Логин" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: "Пароль" })
  @IsString()
  @IsNotEmpty()
  hash: string;
}
