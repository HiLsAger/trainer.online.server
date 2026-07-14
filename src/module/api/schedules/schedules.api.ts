import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { DayOfWeek, Schedule } from "../../database/models/schedule.model";
import { ScheduleInterface } from "./schedules.interfaces";
import { Training } from "../../database/models/training.model";
import { User } from "../../database/models/user.model";
import { Style } from "../../database/models/style.model";
import ApiFacade from "../api.facade";

@Injectable()
export default class SchedulesApi {
  DAYS_OF_WEEK: object = {
    0: DayOfWeek.SUNDAY,
    1: DayOfWeek.MONDAY,
    2: DayOfWeek.TUESDAY,
    3: DayOfWeek.WEDNESDAY,
    4: DayOfWeek.THURSDAY,
    5: DayOfWeek.FRIDAY,
    6: DayOfWeek.SATURDAY,
  };

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
    const daysOfWeek = this.createDaysOfWeekList(startDate, endDate);

    const start = `${startDate} 00:00:00`;
    const end = `${endDate} 23:59:59`;

    const schedules = await this.scheduleModel.findAll({
      where: {
        training_room_id: trainingRoomId,
        [Op.and]: [
          {
            day_of_week: {
              [Op.in]: Array.from(daysOfWeek),
            },
          },
          {
            [Op.or]: [
              {
                [Op.and]: [
                  { always: true },
                  {
                    start_date: {
                      [Op.lte]: end,
                    },
                  },
                ],
              },
              {
                [Op.and]: [
                  { always: false },
                  {
                    start_date: {
                      [Op.lte]: end,
                    },
                  },
                  {
                    end_date: {
                      [Op.gte]: start,
                    },
                  },
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

    console.log(
      schedules.map((schedule) => ({
        id: schedule.id,
        always: schedule.always,
        day: schedule.day_of_week,
        start: schedule.start_date,
        end: schedule.end_date,
      })),
    );

    return this.createScheduleData(startDate, endDate, schedules);
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

  protected createDaysOfWeekList(
    startDate: string,
    endDate: string,
  ): Set<DayOfWeek> {
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return new Set<DayOfWeek>();
    }

    if (start > end) {
      return new Set<DayOfWeek>();
    }

    const uniqueDays = new Set<DayOfWeek>();

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = this.DAYS_OF_WEEK[current.getDay()];
      uniqueDays.add(dayOfWeek);
      current.setDate(current.getDate() + 1);

      if (uniqueDays.size >= 7) {
        break;
      }
    }

    return uniqueDays;
  }

  protected createScheduleData(
    startDate: string,
    endDate: string,
    schedules: Schedule[],
  ): Record<string, ScheduleInterface[]> {
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const prepared = schedules.map((schedule) => {
      const begin = this.parseDate(schedule.start_date);
      begin.setHours(0, 0, 0, 0);

      const finish = schedule.end_date
        ? this.parseDate(schedule.end_date)
        : null;

      finish?.setHours(0, 0, 0, 0);

      return {
        weekday: schedule.day_of_week,
        always: schedule.always,
        begin,
        finish,
        data: this.prepareScheduleData(schedule),
      };
    });

    const result: Record<string, ScheduleInterface[]> = {};

    const current = new Date(start);

    while (current <= end) {
      const day = this.DAYS_OF_WEEK[current.getDay()];
      const key = this.formatDate(current);

      result[key] = [];

      for (const schedule of prepared) {
        if (schedule.weekday !== day) {
          continue;
        }

        if (current < schedule.begin) {
          continue;
        }

        if (!schedule.always) {
          if (!schedule.finish) {
            continue;
          }

          if (current > schedule.finish) {
            continue;
          }
        }

        result[key].push(schedule.data);
      }

      current.setDate(current.getDate() + 1);
    }

    return result;
  }

  protected parseDate(date: string): Date {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  protected formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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
