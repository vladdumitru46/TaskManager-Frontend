export class Constans {
    
    static baseUrl: string = "http://localhost:8080/v1";

    //User
    static logIn: string = this.baseUrl + "/user/login";
    static register: string = this.baseUrl + "/user/register";
    static getAllUsers: string = this.baseUrl + "/user/all";
    static logout: string = this.baseUrl + "/user/logout";
    static getByToken: string = this.baseUrl + "/user/getByToken?token=";

    //Project
    static populateProjectList: string = this.baseUrl + "/project/all";
    static getProjectByName: string = this.baseUrl + "/project?name=";
    static addProject: string = this.baseUrl + "/project/add";

    //Task
    static populateTaskList: string = this.baseUrl + "/task?projectName=";
    static getByUniqueName: string = this.baseUrl + "/task/getByUniqueName?uniqueName=";
    static updateTask: string = this.baseUrl + "/task/update";
    static addTask: string = this.baseUrl + "/task/add";
    static getAllStatuses: string = this.baseUrl + "/task/statuses";

    //Log time on task
    static getAllLogsForUser: string = this.baseUrl + "/logTimeOnTask/currentUser?token=";
    static getAllLogsForTask: string = this.baseUrl + "/logTimeOnTask/task?taskId=";
    static addLogForTask: string = this.baseUrl + "/logTimeOnTask/add";
    static addLogForTaskForUserInPeriodOfTime: string = this.baseUrl + "/logTimeOnTask/userInPeriodOfTime";

}