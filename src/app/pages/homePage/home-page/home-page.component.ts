import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../data/Project';
import { ProjectService } from '../../service/project/project.service';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { ProjectCardComponent } from "../project-card/project-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ToolbarComponent, ProjectCardComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  projects: Project[] = [];

  constructor(private router: Router, private projectService: ProjectService) {
    this.checkAuth();
    this.populateProjectList();
  }

  populateProjectList() {
    this.projectService.populateProjectList().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openProject(project: Project) {
    this.router.navigate(['/project', project.name]);
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }//TODO verify if token is expired
  }
}
