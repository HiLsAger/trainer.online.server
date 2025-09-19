import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api.facade";
import { InjectModel } from "@nestjs/sequelize";
import { Style } from "../../database/models/style.model";
import StyleBuilder from "./style.builder";

@Injectable()
export default class StylesApi {
  constructor(
    @InjectModel(Style) protected readonly styleModel: typeof Style,
    @Inject(forwardRef(() => ApiFacade)) protected api: ApiFacade,
    protected readonly styleBuilder: StyleBuilder,
  ) {}

  public prepareStyleToTag(style: Style): string {
    const styleInfo = this.buildStyleInfo(style);

    return this.styleBuilder.buildStyleHtmlFromStyleInfo(styleInfo);
  }

  public async getBuildStyleById(id: number): Promise<string> {
    const style = await this.styleModel.findOne({
      where: {
        id: id,
      },
    });

    return !style ? this.buildStyleList(style) : "";
  }

  public async getBuildStyles(): Promise<StyleBuiltInfo[] | null> {
    const styles = await this.styleModel.findAll();

    if (!styles) {
      return null;
    }

    const stylePropertiesList: StyleBuiltInfo[] = [];
    styles.forEach((style) => {
      stylePropertiesList.push(this.buildStyleInfo(style));
    });

    return stylePropertiesList;
  }

  public buildStyleInfo(style: Style): StyleBuiltInfo {
    return {
      id: style.id,
      name: style.name,
      styles: this.buildStyleList(style),
    };
  }

  public buildStyleList(style: Style): string {
    const result = {
      backgroundColor: null,
      fontSize: null,
      color: null,
      other: null,
    };

    if (style.background_color) {
      result.backgroundColor = `background-color: ${style.background_color};`;
    }

    if (style.font_size) {
      result.fontSize = `font-size: ${style.font_size}px;`;
    }

    if (style.color) {
      result.color = `color: ${style.color};`;
    }

    if (style.css) {
      const otherStyles: string[] = [];
      const cssRules = style.css.split(";").filter((rule) => rule.trim());

      cssRules.forEach((rule) => {
        const [property, value] = rule.split(":").map((part) => part.trim());

        if (!property || !value) return;

        switch (property) {
          case "background-color":
            result.backgroundColor = `background-color: ${value};`;
            break;
          case "color":
            result.color = `color: ${value};`;
            break;
          case "font-size":
            result.fontSize = `font-size: ${value};`;
            break;
          default:
            otherStyles.push(`${property}: ${value};`);
            break;
        }
      });

      if (otherStyles.length > 0) {
        result.other = otherStyles.join(" ");
      }
    }

    const styles: string[] = [];

    if (result.backgroundColor) styles.push(result.backgroundColor);
    if (result.fontSize) styles.push(result.fontSize);
    if (result.color) styles.push(result.color);
    if (result.other) styles.push(result.other);

    return styles.join(" ").trim();
  }
}
