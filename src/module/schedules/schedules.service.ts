import { BadRequestException, Injectable } from "@nestjs/common";
import ApiFacade from "../api/api.facade";
import { Schedule } from "../database/models/schedule.model";
import ScheduleInput from "../database/model.inputs/schedule.input";
import SchedulesHelper from "./schedules.helper";
import { ScheduleInterface } from "../api/schedules/schedules.interfaces";

@Injectable()
export default class SchedulesService {
  public constructor(protected api: ApiFacade) {}

  public async upsert(
    data: ScheduleInput,
    id: number = 0,
  ): Promise<ScheduleInput> {
    return await (id ? this.update(data, id) : this.insert(data));
  }

  protected async insert(data: ScheduleInput): Promise<ScheduleInput> {
    if (!(await this.api.trainings.hasTraining(data.training_id))) {
      throw new BadRequestException();
    }

    const model = await Schedule.create({
      always: data.always,
      duration: data.duration,
      price: data.price,
      training_id: data.training_id,
      training_room_id: data.training_room_id,
      start_date: data.start_date,
      start_time: data.start_time,
      end_date: data.end_date,
    });

    return SchedulesHelper.prepareData(model);
  }

  protected async update(
    data: ScheduleInput,
    id: number,
  ): Promise<ScheduleInput> {
    const model = await this.getModel(id);

    await model.update({
      always: data.always,
      duration: data.duration,
      price: data.price,
      training_id: data.training_id,
      training_room_id: data.training_room_id,
      start_date: data.start_date,
      start_time: data.start_time,
      end_date: data.end_date,
    });

    return SchedulesHelper.prepareData(model);
  }

  public async getScheduleList(
    startDate: string,
    endDate: string,
    trainingRoomId: number,
  ): Promise<Record<string, Omit<ScheduleInterface, "date">[]>> {
    return await this.api.schedules.getScheduleBetweenDate(
      startDate,
      endDate,
      trainingRoomId,
    );
  }

  public async getScheduleById(id: number): Promise<ScheduleInterface> {
    const schedule = this.api.schedules.getScheduleById(id);
    if (!schedule) {
      throw new Error("Не удалось найти запись");
    }

    return schedule;
  }

  public async delete(id: number): Promise<string> {
    await Schedule.destroy({
      where: { id: id },
    });

    return "success";
  }

  protected async getModel(id: number): Promise<Schedule> {
    return await Schedule.findOne({
      where: { id: id },
    });
  }
}
