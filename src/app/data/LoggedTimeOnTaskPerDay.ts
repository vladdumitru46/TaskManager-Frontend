import { Task } from "./Task";

export interface LoggedTimeOnTaskPerDay{
    task: Task;
    timeLogged: number;
    day: Date;
}