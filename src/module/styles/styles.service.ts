import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthToken } from "../database/models/authTokens.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import ListStorage from "../../storage/list.storage";
import Form from "../../packages/forms/interfaces/form.interface";
import StylesHelper from "./styles.helper";
import { Style } from "../database/models/style.model";
import { StyleInput } from "../database/model.inputs/style.input";

@Injectable()
export default class StylesService {
  constructor(
    @InjectModel(Style) private readonly modelStyle: typeof Style,
    @InjectModel(AuthToken) private readonly modelAuthToken: typeof AuthToken,
  ) {}

  public async getGrid(
    limit: number = 50,
    page: number = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: Filter | null,
  ): Promise<Grid> {
    limit =
      limit <= ListStorage.maxListItems ? limit : ListStorage.maxListItems;

    const items = await Style.findAll({
      attributes: [
        "id",
        "name",
        "background_color",
        "color",
        "font_size",
        "css",
      ],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    return StylesHelper.prepareToGrid(items);
  }

  public async getForm(id: number): Promise<Form> {
    const item = await Style.findOne({
      attributes: [
        "id",
        "name",
        "background_color",
        "color",
        "font_size",
        "css",
      ],
      where: { id: id },
    });

    return StylesHelper.prepareToForm(item);
  }

  public async upsert(data: StyleInput, id: number): Promise<StyleInput> {
    return await (id ? this.update(data, id) : this.insert(data));
  }

  protected async update(data: StyleInput, id: number): Promise<StyleInput> {
    const model = await this.getModel(id);

    await model.update({
      name: data.name,
      background_color: data.background_color,
      color: data.color,
      font_size: data.font_size,
      css: data.css,
    });

    return StylesHelper.prepareData(model);
  }

  protected async insert(data: StyleInput): Promise<StyleInput> {
    const model = await this.modelStyle.create({
      name: data.name,
      background_color: data.background_color,
      color: data.color,
      font_size: data.font_size,
      css: data.css,
    });

    return StylesHelper.prepareData(model);
  }

  public async delete(id: number): Promise<string> {
    await this.modelStyle.destroy({
      where: { id: id },
    });

    return "success";
  }

  protected async getModel(id: number): Promise<Style> {
    return await Style.findOne({
      where: { id: id },
    });
  }
}
