import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../service/task/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { ProjectNavigationBarComponent } from "../project-navigation-bar/project-navigation-bar.component";
import { Task } from '../../../data/Task';
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: 'app-khaban-task-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ToolbarComponent, ProjectNavigationBarComponent, TaskCardComponent],
  templateUrl: './khaban-task-view.component.html',
  styleUrl: './khaban-task-view.component.css'
})
export class KhabanTaskViewComponent {
  statusList: string[] = [];
  taskList: Task[] = [];
  tasksByStatus: { [key: string]: Task[] } = {}; 
  draggedTask: Task | null = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    const name: string | null = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.populateStatusList();
      this.populateTaskList(name);
    }
  }

  populateTaskList(name: string) {
    this.taskService.populateTaskList(name).subscribe({
      next: (response) => {
        this.taskList = response;
        this.organizeTasksByStatus(); 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  populateStatusList() {
    this.taskService.getAllStatues().subscribe({
      next: (response) => {
        this.statusList = response;
        this.initializeStatusMap();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  initializeStatusMap() {
    this.tasksByStatus = {};
    this.statusList.forEach(status => {
      this.tasksByStatus[status] = [];
    });
  }

  organizeTasksByStatus() {
    this.initializeStatusMap();
    this.taskList.forEach(task => {
      if (this.tasksByStatus[task.taskStatus]) {
        this.tasksByStatus[task.taskStatus].push(task);
      }
    });
  }

  onDragStart(event: DragEvent, task: Task) {
    this.draggedTask = task;
    event.dataTransfer?.setData('text/plain', task.name); 
    event.dataTransfer!.effectAllowed = 'move';
  }

  onDragEnd(event: DragEvent) {
    this.draggedTask = null;
  }

  onDragOver(event: DragEvent, targetStatus: string) {
    event.preventDefault(); 
  }

  onDrop(event: DragEvent, targetStatus: string) {
    event.preventDefault();
    if (this.draggedTask) {
      const currentStatus = this.draggedTask.taskStatus;

      this.tasksByStatus[currentStatus] = this.tasksByStatus[currentStatus].filter(task => task !== this.draggedTask);

      this.draggedTask.taskStatus = targetStatus;

      this.tasksByStatus[targetStatus].push(this.draggedTask);

      console.log('Task moved:', this.draggedTask.taskStatus);
      this.updateTask(this.draggedTask)
    }
  }

  updateTask(task:Task) {
    this.taskService.updateTask(task).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
