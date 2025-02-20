import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from "../toolbar/toolbar.component";
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

  projects = [{
    title: 'titlu 1',
    description: 'aaaaaa'
  },
  {
    title: 'titlu 2',
    description: 'aaaaaa'
  }];

  constructor(private router: Router) {
    this.checkAuth();
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      //TODO to add verification of expired tokens
    }
  }
}
