import { LoggedTimeOnTaskPerDay } from "./LoggedTimeOnTaskPerDay";
import { TotalLoggedTimeOnTaskPerDay } from "./TotalLoggedTimeOnTaskPerDay";

export interface AllLoggedTimeForUserResponse {
    loggedTimeOnTaskPerDays: LoggedTimeOnTaskPerDay[];
    totalTimeLogged: number;
    totalLoggedTimeOnTaskPerDays: TotalLoggedTimeOnTaskPerDay[];
}