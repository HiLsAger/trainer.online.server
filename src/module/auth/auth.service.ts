import md5 from 'md5-hash';
import {
  Injectable,
  Ip,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../datebase/models/user.model';
import { UserInput, UserLoginInput } from '../datebase/model.inputs/user.input';
import { AuthTocken } from '../datebase/models/authTokens.model';
import { authTokenResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(AuthTocken) private readonly modelAuthToken: typeof AuthTocken,
  ) {}

  async getHello() {
    const data = await this.modelUser.findOne({
      where: { id: 1 },
    });
    return data;
  }

  async getUserByLogin(login: string): Promise<User | null> {
    const data = await this.modelUser.findOne({
      where: {
        login: login,
      },
      rejectOnEmpty: new NotFoundException('Пользователь не найден'),
    });
    return data;
  }

  async register(ip: string, body: UserInput): Promise<authTokenResponse> {
    const user = await this.modelUser.create(body);
    const token = await this.modelAuthToken.create({
      ip: ip,
      user_id: user.id,
    });
    token.user = user;
    return this.createAuthTokenResponse(token);
  }

  async login(ip: string, body: UserLoginInput): Promise<authTokenResponse> {
    const user = await this.modelUser.findOne({
      where: { login: body.login, hash: md5(body.hash) },
    });

    let token = undefined;
    if (user) {
      token = await this.modelAuthToken.create({ ip: ip, user_id: user.id });
      if (!token)
        token = new NotAcceptableException('Не удалось создать токен');
      else token.user = user;
      console.log(token);
    } else token = new NotFoundException('Логин или пароль не верный');

    return this.createAuthTokenResponse(token);
  }

  private createAuthTokenResponse(model: AuthTocken): authTokenResponse {
    const token: authTokenResponse = {
      token: model.token,
      created: model.created_at,
      life_time: model.life_time,
      user: {
        id: model.user.id,
        login: model.user.login,
        name: model.user.name,
      },
    };
    return token;
  }
}
