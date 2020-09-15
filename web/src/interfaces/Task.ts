export interface ITask {
  id: string;
  name: string;
  
  start_date: Date;
  end_date?: Date;
  
  status: number;
  cancel_reason?: string;

  user_name?: string;
  email?: string;
}
