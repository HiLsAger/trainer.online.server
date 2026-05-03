import ApiAbstract from "../api.abstract";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ApiFacade from "../api.facade";
import { InjectModel } from "@nestjs/sequelize";
import { Training } from "../../database/models/training.model";

@Injectable()
export default class TrainingsApi extends ApiAbstract {
  constructor(
    @Inject(forwardRef(() => ApiFacade)) protected readonly api: ApiFacade,
    @InjectModel(Training) protected readonly trainingModel: typeof Training,
  ) {
    super();
  }

  public async getTrainings(): Promise<Record<string, string>> {
    return await this.trainingModel
      .findAll({ attributes: ["id", "name"] })
      .then((trainings) => this.arrayMap(trainings, "id", "name"));
  }

  public async hasTraining(id: number): Promise<boolean> {
    return await this.trainingModel
      .findOne({
        attributes: ["id"],
        where: { id: id },
      })
      .then((training) => Boolean(training.id));
  }
}
