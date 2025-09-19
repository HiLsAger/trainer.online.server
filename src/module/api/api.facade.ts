import StylesApi from "./styles/styles.api";
import { forwardRef, Inject, Injectable } from "@nestjs/common";

@Injectable()
export default class ApiFacade {
  constructor(
    @Inject(forwardRef(() => StylesApi)) private stylesApi: StylesApi,
  ) {}

  get styles() {
    return this.stylesApi;
  }
}
