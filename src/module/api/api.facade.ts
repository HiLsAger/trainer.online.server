import StylesApi from "./styles/styles.api";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import UsersApi from "./users/users.api";

@Injectable()
export default class ApiFacade {
  constructor(
    @Inject(forwardRef(() => StylesApi)) protected stylesApi: StylesApi,
    @Inject(forwardRef(() => UsersApi)) protected usersApi: UsersApi,
  ) {}

  get styles() {
    return this.stylesApi;
  }

  get users() {
    return this.usersApi;
  }
}
