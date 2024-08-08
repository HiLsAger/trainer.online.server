import { CreationAttributes } from 'sequelize';
import { AuthTocken } from '../models/authTokens.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthTokenInput implements CreationAttributes<AuthTocken> {
  @ApiProperty({ description: 'Токен авторизации' })
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty({ description: 'Уникальный ключ пользователя' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Время жизни токен' })
  @IsNumber()
  life_time?: number;
}
