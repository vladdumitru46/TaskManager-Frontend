import { Component } from '@angular/core';
import { Project } from '../../data/Project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../service/project/project.service';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { TaskTableComponent } from "../task-table/task-table.component";
import { Task } from '../../data/Task';
import { TaskService } from '../../service/task/task.service';

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


  constructor(private route: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService) {
    const projectName = this.route.snapshot.paramMap.get('name');
    if (projectName) {
      this.loadProject(projectName);
      this.populateTaskList(projectName);
    }
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
