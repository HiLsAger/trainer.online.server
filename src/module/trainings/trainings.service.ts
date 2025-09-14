import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthToken } from "../database/models/authTokens.model";
import { Training } from "../database/models/training.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import ListStorage from "../../storage/list.storage";
import Form from "../../packages/forms/interfaces/form.interface";
import TrainingsHelper from "./trainings.helper";
import { TrainingInput } from "../database/model.inputs/training.input";

@Injectable()
export default class TrainingsService {
  constructor(
    @InjectModel(Training) private readonly modelTraining: typeof Training,
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

    const items = await Training.findAll({
      attributes: ["id", "name", "description"],
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    return TrainingsHelper.prepareToGrid(items);
  }

  public async getForm(id: number): Promise<Form> {
    const item = await Training.findOne({
      attributes: ["id", "name", "description"],
      where: { id: id },
    });

    return TrainingsHelper.prepareToForm(item);
  }

  public async upsert(data: TrainingInput, id: number): Promise<TrainingInput> {
    return await (id ? this.update(data, id) : this.insert(data));
  }

  protected async update(data: TrainingInput, id: number): Promise<TrainingInput> {
    const model = await this.getModel(id);

    await model.update({
      name: data.name,
      description: data.description,
    });

    return TrainingsHelper.prepareData(model);
  }

  protected async insert(data: TrainingInput): Promise<TrainingInput> {
    const model = await this.modelTraining.create({
      name: data.name,
      description: data.description,
    });

    return TrainingsHelper.prepareData(model);
  }

  public async delete(id: number): Promise<string> {
    await this.modelTraining.destroy({
      where: { id: id },
    });

    return "success";
  }

  protected async getModel(id: number): Promise<Training> {
    return await Training.findOne({
      where: { id: id },
    });
  }
}
