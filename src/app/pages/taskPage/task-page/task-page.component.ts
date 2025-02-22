import { Component } from '@angular/core';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { Task } from '../../../data/Task';
import { TaskService } from '../../../service/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsComponent } from "../task-details/task-details.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../data/User';
import { UserService } from '../../../service/user/user.service';
import { LogTimeComponent } from "../log-time/log-time.component";

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [ToolbarComponent, TaskDetailsComponent, CommonModule, FormsModule, LogTimeComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {
  task!: Task;
  isEditingName: boolean = false;
  editedTaskName: string = '';
  isEditingDescription: boolean = false;
  editedDescription: string = '';

  
  userList: User[] = [];
  statusesList: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService, private userService: UserService) {
    this.checkAuth();
    const uniqueName = this.route.snapshot.paramMap.get('uniqueName');
    if (uniqueName) {
      this.getTask(uniqueName);
      this.getAllStatues();
      this.getAllUsers();
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
  async getTask(uniqueName: string) {
    this.taskService.getTaskByUniqueName(uniqueName).subscribe(response => {
      this.task = response;
      this.editedTaskName = this.task.name;
      this.editedDescription = this.task.description;
    });
  }

  editTaskName() {
    this.isEditingName = true;
  }

  saveTaskName() {
    this.task.name = this.editedTaskName;
    this.updateTask();
    this.isEditingName = false;  
    console.log("merge task name save");
  }
  
  cancelEditTaskName() {
    this.editedTaskName = this.task.name;
    this.isEditingName = false;  
  }
  
  saveTaskDescription() {
    this.task.description = this.editedDescription;
    this.updateTask();
    this.isEditingDescription = false;  
    console.log("merge task description save");
  }
  
  cancelTaskDescription() {
    this.editedDescription = this.task.description;
    this.isEditingDescription = false;  
  }
  

  updateTask() {
    this.taskService.updateTask(this.task).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }//TODO verify if token is expired
  }
}

