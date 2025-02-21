export class Constans {
    static baseUrl: string = "http://localhost:8080/v1";
    static logIn: string = this.baseUrl + "/user/login";
    static register: string = this.baseUrl + "/user/register";
    static populateProjectList: string = this.baseUrl + "/project/all";
    static getProjectByName: string = this.baseUrl + "/project?name=";
    static populateTaskList: string = this.baseUrl + "/task?projectName=";
    static getByUniqueName: string = this.baseUrl + "/task/getByUniqueName?uniqueName=";
    static getAllUsers: string = this.baseUrl + "/user/all";
    static updateTask: string = this.baseUrl + "/task/update";
    static getAllStatuses: string = this.baseUrl + "/task/statuses";

}