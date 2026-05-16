import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Schedule } from "../../database/models/schedule.model";
import { ScheduleInterface } from "./schedules.interfaces";
import { Training } from "../../database/models/training.model";
import { User } from "../../database/models/user.model";
import { Style } from "../../database/models/style.model";
import ApiFacade from "../api.facade";

@Injectable()
export default class SchedulesApi {
  public constructor(
    @InjectModel(Schedule) protected readonly scheduleModel: typeof Schedule,
    @Inject(forwardRef(() => ApiFacade)) protected api: ApiFacade,
  ) {}

  /**
   * Получение списка тренировок между 2ух дат
   *
   * TODO Добавить ограничение выборки по времени, брать из настроек
   */
  public async getScheduleBetweenDate(
    startDate: string,
    endDate: string,
    trainingRoomId: number,
  ): Promise<Record<string, Omit<ScheduleInterface, "date">[]>> {
    const schedules = await this.scheduleModel.findAll({
      where: {
        training_room_id: trainingRoomId,
        [Op.or]: [
          {
            [Op.and]: [
              { always: { [Op.ne]: true } },
              { start_date: { [Op.gte]: startDate } },
              { start_date: { [Op.lte]: endDate } },
            ],
          },
          {
            [Op.and]: [
              { always: true },
              {
                [Op.or]: [
                  { end_date: { [Op.lt]: endDate } },
                  { end_date: { [Op.is]: null } },
                ],
              },
            ],
          },
        ],
      },
      order: [["start_time", "ASC"]],
      include: [
        {
          model: Training,
          include: [{ model: User }, { model: Style }],
        },
      ],
    });

    return schedules.reduce(
      (acc, schedule) => {
        const date = new Date(schedule.start_date).toISOString().slice(0, 10);

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(this.prepareScheduleData(schedule));

        return acc;
      },
      {} as Record<string, Omit<ScheduleInterface, "date">[]>,
    );
  }

  public async getScheduleById(id: number): Promise<ScheduleInterface | null> {
    const schedule = await this.scheduleModel.findOne({
      where: { id: id },
      include: [
        {
          model: Training,
          include: [{ model: User }, { model: Style }],
        },
      ],
    });

    if (!schedule) {
      return null;
    }

    return this.prepareScheduleData(schedule);
  }

  protected prepareScheduleData(schedule: Schedule): ScheduleInterface {
    return {
      schedule_rule_id: schedule.id,
      start_date: schedule.start_date,
      end_date: schedule.end_date,
      time: schedule.start_time,
      duration: schedule.duration,
      trainer_name: schedule.training?.trainer?.name ?? "",
      training_name: schedule.training?.name ?? "",
      style: {
        color: schedule.training?.style.color,
        background_color: schedule.training?.style.background_color,
        font_size: schedule.training?.style.font_size,
        css: schedule.training?.style.css,
      },
      price: schedule.price,
      training_id: schedule.training_id,
      always: schedule.always,
      training_room_id: schedule.training_room_id,
    } as ScheduleInterface;
  }
}
