export type ISocialTask = {
  id: number;
  _id: string;
  name: string;
  type: string;
  description: string;
  reward_amount: number;
  thumbnail: string;
  task_url: string;
  public_url: string;
  task_type: string;
  status: string;
  task_group_name: string;
  task_group_description: string;
  task_group_image: string;
  task_user: ITaskUser | null;
  title: string;
  reward_number: number;
  logo: string;
  keyword: string | null;
};

export type ITaskUser = {
  status: ITaskUserStatus;
  reward_amount: number;
  is_done: boolean;
};

export enum ITaskUserStatus {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}
