export interface IUpdateTaskDTO {
  id: string;
  end_date: Date;
  cancel_reason?: string;
  user_id: string;
}
