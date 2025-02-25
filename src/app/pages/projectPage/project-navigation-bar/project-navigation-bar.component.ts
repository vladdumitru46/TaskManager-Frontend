import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-navigation-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './project-navigation-bar.component.html',
  styleUrl: './project-navigation-bar.component.css'
})
export class ProjectNavigationBarComponent {

  projectName: string = "";
  constructor(private route: ActivatedRoute){
     const name = this.route.snapshot.paramMap.get('name');
     if(name){
      this.projectName = name;
     }
  }

}
