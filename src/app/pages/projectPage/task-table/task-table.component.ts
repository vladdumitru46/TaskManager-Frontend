import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent {
  @Input() name: string = '';
  @Input() assigne: string = '';
  @Input() status: string = '';
  @Input() uniqueName: string = '';
}
