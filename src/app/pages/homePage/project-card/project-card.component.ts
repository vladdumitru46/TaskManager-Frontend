import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() projectClicked = new EventEmitter<void>(); 

  onClick() {
    this.projectClicked.emit();
  }
}
