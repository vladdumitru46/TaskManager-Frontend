import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../data/User';
import { Project } from '../../../data/Project';
import { UserService } from '../../../service/user/user.service';
import { ProjectService } from '../../../service/project/project.service';
import { TaskService } from '../../../service/task/task.service';

@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.css'
})
export class CreateTaskPageComponent {

  name: string = "";
  description: string = "";
  project: string = "";
  assigne: string = "";
  numberOfHoursToComplete: number = 0;

  userList: User[] = [];
  projectList: Project[] = [];
  filteredUsers: User[] = [];
  selectedUser!: User;

  filteredProjects: Project[] = [];
  selectedProject!: Project;

  constructor(public dialogRef: MatDialogRef<CreateTaskPageComponent>, private userService: UserService, private projectService: ProjectService, private taskService: TaskService) {
    this.populateUserList();
    this.populateProjectList();
    this.filteredUsers = this.userList;
    this.filteredProjects = this.projectList;
  }


  populateProjectList() {
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.projectList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  populateUserList() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  filterUsers() {
    if (this.assigne.length > 0) {
      this.filteredUsers = this.userList.filter(user =>
        user.name.toLowerCase().includes(this.assigne.toLowerCase())
      );
    } else {
      this.filteredUsers = [];
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.assigne = user.name;
    this.filteredUsers = [];
  }

  filterProjects() {
    if (this.project.length > 0) {
      this.filteredProjects = this.projectList.filter(pro =>
        pro.name.toLowerCase().includes(this.project.toLowerCase())
      );
    } else {
      this.filteredProjects = [];
    }
  }

  selectProject(pro: Project) {
    this.selectedProject = pro;
    this.project = pro.name;
    this.filteredProjects = [];
  }

  save() {
    this.taskService.addTask(this.name, this.description, this.project, this.assigne, this.numberOfHoursToComplete).subscribe({
      next: (response) => {
        // this.userList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.dialogRef.close();
    window.location.reload();
  }

  cancel() {
    this.dialogRef.close();
  }
}
