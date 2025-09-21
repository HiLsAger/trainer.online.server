import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthToken } from "../database/models/authTokens.model";
import { Training } from "../database/models/training.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import ListStorage from "../../storage/list.storage";
import Form from "../../packages/forms/interfaces/form.interface";
import TrainingsHelper from "./trainings.helper";
import { TrainingInput } from "../database/model.inputs/training.input";
import { Style } from "../database/models/style.model";
import { User } from "../database/models/user.model";

@Injectable()
export default class TrainingsService {
  constructor(
    @InjectModel(Training) protected readonly modelTraining: typeof Training,
    @InjectModel(AuthToken) protected readonly modelAuthToken: typeof AuthToken,
    protected readonly trainingHelper: TrainingsHelper,
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
      attributes: ["id", "name", "trainer_id", "description"],
      offset: (page - 1) * limit,
      limit: Number(limit),
      include: [{ model: Style }, { model: User, attributes: ["name"] }],
    });

    return this.trainingHelper.prepareToGrid(items);
  }

  public async getForm(id: number): Promise<Form> {
    const item = await Training.findOne({
      attributes: ["id", "name", "trainer_id", "description"],
      where: { id: id },
    });

    return TrainingsHelper.prepareToForm(item);
  }

  public async upsert(data: TrainingInput, id: number): Promise<TrainingInput> {
    return await (id ? this.update(data, id) : this.insert(data));
  }

  protected async update(
    data: TrainingInput,
    id: number,
  ): Promise<TrainingInput> {
    const model = await this.getModel(id);

    await model.update({
      name: data.name,
      description: data.description,
      trainer_id: data.trainer_id,
      style_id: data.style_id,
    });

    return TrainingsHelper.prepareData(model);
  }

  protected async insert(data: TrainingInput): Promise<TrainingInput> {
    const model = await this.modelTraining.create({
      name: data.name,
      description: data.description,
      trainer_id: data.trainer_id,
      style_id: data.style_id,
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
