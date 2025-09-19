import { Injectable } from "@nestjs/common";

@Injectable()
export default class StyleBuilder {
  public buildStyleHtmlFromStyleInfo(
    style: StyleBuiltInfo,
    tag: string = "p",
  ): string {
    return `<${tag} style="${style.styles}">
      ${style.name}
    </${tag}>`;
  }
}