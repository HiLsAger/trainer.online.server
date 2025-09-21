import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Training } from "../database/models/training.model";
import { AuthToken } from "../database/models/authTokens.model";
import { Filter, Grid } from "../../system/interfaces/grid.intefrace";
import ListStorage from "../../storage/list.storage";
import { Style } from "../database/models/style.model";
import { User } from "../database/models/user.model";
import Form from "../../packages/forms/interfaces/form.interface";
import { TrainingRoom } from "../database/models/trainingRoom.model";
import TrainingRoomsHelper from "./trainingRooms.helper";
import { TrainingRoomsInput } from "../database/model.inputs/trainingRooms.input";

@Injectable()
export default class TrainingRoomsService {
  constructor(
    @InjectModel(TrainingRoom)
    protected readonly modelTrainingRooms: typeof TrainingRoom,
    @InjectModel(AuthToken) protected readonly modelAuthToken: typeof AuthToken,
    protected readonly trainingRoomsHelper: TrainingRoomsHelper,
  ) {}

  public async getGrid(
    limit: number = 50,
    page: number = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: Filter | null,
  ): Promise<Grid> {
    limit =
      limit <= ListStorage.maxListItems ? limit : ListStorage.maxListItems;

    const items = await TrainingRoom.findAll({
      attributes: ["id", "name", "description"],
      offset: (page - 1) * limit,
      limit: Number(limit),
      include: [{ model: Style }],
    });

    return this.trainingRoomsHelper.prepareToGrid(items);
  }

  public async getForm(id: number): Promise<Form> {
    const item = await TrainingRoom.findOne({
      attributes: ["id", "name", "sort", "style_id", "description"],
      where: { id: id },
    });

    return this.trainingRoomsHelper.prepareToForm(item);
  }

  public async upsert(
    data: TrainingRoomsInput,
    id: number,
  ): Promise<TrainingRoomsInput> {
    return await (id ? this.update(data, id) : this.insert(data));
  }

  protected async update(
    data: TrainingRoomsInput,
    id: number,
  ): Promise<TrainingRoomsInput> {
    const model = await this.getModel(id);

    await model.update({
      name: data.name,
      description: data.description,
      sort: data.sort,
      style_id: data.style_id,
    });

    return this.trainingRoomsHelper.prepareData(model);
  }

  protected async insert(
    data: TrainingRoomsInput,
  ): Promise<TrainingRoomsInput> {
    const model = await this.modelTrainingRooms.create({
      name: data.name,
      description: data.description,
      sort: data.sort,
      style_id: data.style_id,
    });

    return this.trainingRoomsHelper.prepareData(model);
  }

  public async delete(id: number): Promise<string> {
    await this.modelTrainingRooms.destroy({
      where: { id: id },
    });

    return "success";
  }

  protected async getModel(id: number): Promise<TrainingRoom> {
    return await TrainingRoom.findOne({
      where: { id: id },
    });
  }
}
