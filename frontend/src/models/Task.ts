export interface ITask {
  id: number;
  title: string;
  description: string | null;
  userId:number
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};