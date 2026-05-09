import { Schedule } from "../database/models/schedule.model";
import ScheduleInput from "../database/model.inputs/schedule.input";

export default class SchedulesHelper {
  public static prepareData(training: Schedule): ScheduleInput {
    return {
      id: training.id,
      training_id: training.training_id,
      training_room_id: training.training_room_id,
      start_date: training.start_date,
      start_time: training.start_time,
      duration: training.duration,
      end_date: training.end_date,
      always: training.always,
      price: training.price,
    };
  }
}
