import { Task } from "./Task";
import { User } from "./User";

export interface LogTimeOnTask{
    id: number;
    description: string;
    user: User;
    task: Task;
    logDate: Date;
    logTime: number;
}