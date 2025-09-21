import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api.facade";
import { InjectModel } from "@nestjs/sequelize";
import { TrainingRoom } from "../../database/models/trainingRoom.model";
import ApiAbstract from "../api.abstract";
import { Role } from "../../database/models/role.model";
import RoleTypeStorage from "../../../storage/roleType.storage";

@Injectable()
export default class TrainingRoomsApi extends ApiAbstract {
  constructor(
    @InjectModel(TrainingRoom)
    protected readonly trainingRoomModel: typeof TrainingRoom,
    @Inject(forwardRef(() => ApiFacade)) protected api: ApiFacade,
  ) {
    super();
  }

  public async getTrainingRooms(): Promise<Record<string, string>> {
    return this.trainingRoomModel
      .findAll({ attributes: ["id", "name"] })
      .then((trainingRooms) => this.arrayMap(trainingRooms, "id", "name"));
  }
}
