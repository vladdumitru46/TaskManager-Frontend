import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../data/Task';
import { LogTimeOnTaskService } from '../../../service/logTimeOnTask/log-time-on-task.service';

@Component({
  selector: 'app-log-time-formular',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './log-time-formular.component.html',
  styleUrl: './log-time-formular.component.css'
})
export class LogTimeFormularComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();

  description: string = "";
  numberOfHours: number = 0;
  date!: Date;

  constructor(private logTimeOnTaskService: LogTimeOnTaskService) { }

  logTime() {
    let token = localStorage.getItem("token");
    if (token) {
      this.logTimeOnTaskService.logTimeOnTask(this.description, this.numberOfHours, this.task.id, this.date, token).subscribe({
        next: () => {
          this.close.emit();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  cancel() {
    this.close.emit();
  }
}
