import { CreationAttributes } from "sequelize";
import { User } from "../models/user.model";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";

export class UserInput implements CreationAttributes<User> {
  @ApiProperty({ description: "Логин" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: "пароль" })
  @IsString()
  @IsNotEmpty()
  hash: string;

  @ApiProperty({ description: "Имя пользователя" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UserInputForm implements CreationAttributes<User> {
  @ApiProperty({ description: "Id" })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: "Логин" })
  @IsString()
  @IsOptional()
  login: string;

  @ApiProperty({ description: "пароль" })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ description: "Имя пользователя" })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: "Статус" })
  @IsString()
  @IsOptional()
  status: string;
}

export class UserData implements CreationAttributes<User> {
  @ApiProperty({ description: "Id" })
  @IsNumber()
  id: number;

  @ApiProperty({ description: "Логин" })
  @IsString()
  login: string;

  @ApiProperty({ description: "Имя пользователя" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Статус" })
  @IsString()
  status: string;
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
