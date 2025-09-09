import md5 from "md5-hash";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { UserInput, UserLoginInput } from "../database/model.inputs/user.input";
import { AuthToken } from "../database/models/authTokens.model";
import { authTokenResponse } from "./auth.interfaces";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
  ) {}

  async getUserByLogin(login: string): Promise<User | null> {
    const data = await this.modelUser.findOne({
      where: {
        login: login,
      },
      rejectOnEmpty: new NotFoundException("Пользователь не найден"),
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

    if (!user) {
      throw new UnauthorizedException("Логин или пароль не верный");
    }

    const token = await this.modelAuthToken.create({
      ip: ip,
      user_id: user.id,
    });

    if (!token) {
      throw new UnauthorizedException("Не удалось создать токен");
    }

    token.user = user;

    return this.createAuthTokenResponse(token);
  }

  private createAuthTokenResponse(model: AuthToken): authTokenResponse {
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
