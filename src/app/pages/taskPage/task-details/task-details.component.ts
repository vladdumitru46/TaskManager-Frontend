import { Component, Input } from '@angular/core';
import { Task } from '../../../data/Task';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../data/User';
import { TaskService } from '../../../service/task/task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {

  @Input() task!: Task;//TODO the upadates to the server, and the getting values for user and status list

  @Input() statuses: string[] = ["In Progress", "Closed", "Complete", "OPEN"];

  @Input() users: User[] = [];

  filteredUsers: any[] = [];
  assigneeName: string = '';
  selectedUser: any = null;

  constructor(private taskService: TaskService) { }

  filterUsers() {
    if (this.assigneeName.length > 0) {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.assigneeName.toLowerCase())
      );
    } else {
      this.filteredUsers = [];
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.assigneeName = user.name;
    this.filteredUsers = [];
    this.task.user = user;
    this.updateTask();
  }

  updateTask() {
    console.log(this.task.user.username)
    this.taskService.updateTask(this.task).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
