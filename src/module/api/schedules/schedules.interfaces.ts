export interface ScheduleInterface {
  schedule_rule_id: number | null;
  start_date: string;
  end_date: string;
  time: string;
  duration: string;
  trainer_name: string;
  training_name: string;
  style: {
    color?: string;
    background_color?: string;
    font_size?: string;
    css?: string;
  };
  price: number;
  training_id: number;
  always: boolean;
  training_room_id: number;
}
