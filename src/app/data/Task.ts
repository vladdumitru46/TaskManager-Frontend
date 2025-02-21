import { Project } from "./Project";
import { User } from "./User";

export interface Task{
    id: number;
    name: string;
    uniqueName: string;
    description: string;
    project: Project;
    user: User;
    numberOfHoursToComplete: number;
    numberOfHoursSpent: number;
    numberOfHoursRemaining: number;
    taskStatus: string;
}