import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { TaskTableComponent } from "../task-table/task-table.component";
import { Project } from '../../../data/Project';
import { Task } from '../../../data/Task';
import { ProjectService } from '../../../service/project/project.service';
import { TaskService } from '../../../service/task/task.service';
import { User } from '../../../data/User';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-projectpage',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, TaskTableComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectpageComponent {

  project!: Project;
  taskList: Task[] = [];
  userList: User[] = [];
  statusesList: string[] = [];


  constructor(private route: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService, private userService: UserService) {
    const projectName = this.route.snapshot.paramMap.get('name');
    if (projectName) {
      this.loadProject(projectName);
      this.populateTaskList(projectName);
      this.getAllUsers();
      this.getAllStatues();
    }
  }
  getAllStatues() {
    this.taskService.getAllStatues().subscribe({
      next: (response) => {
        this.statusesList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadProject(name: string) {
    this.projectService.getProjectByName(name).subscribe({
      next: (projects) => {
        this.project = projects;
      },
      error: (error) => {
        console.error("Error fetching project:", error);
      }
    });
  }

  populateTaskList(projectName: string) {
    console.log("populate task list...")
    this.taskService.populateTaskList(projectName).subscribe({
      next: (response) => {
        this.taskList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
