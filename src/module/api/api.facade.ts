import StylesApi from "./styles/styles.api";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import UsersApi from "./users/users.api";
import TrainingRoomsApi from "./trainingRooms/trainingRooms.api";
import SettingsApi from "./settings/settings.api";

@Injectable()
export default class ApiFacade {
  constructor(
    @Inject(forwardRef(() => StylesApi)) protected stylesApi: StylesApi,
    @Inject(forwardRef(() => UsersApi)) protected usersApi: UsersApi,
    @Inject(forwardRef(() => TrainingRoomsApi))
    protected trainingRoomsApi: TrainingRoomsApi,
    @Inject(forwardRef(() => SettingsApi)) protected settingsApi: SettingsApi,
  ) {}

  get styles() {
    return this.stylesApi;
  }

  get users() {
    return this.usersApi;
  }

  get trainingRooms() {
    return this.trainingRoomsApi;
  }

  get settings() {
    return this.settingsApi;
  }
}
