import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogTimeOnTask } from '../../../data/LogTimeOnTask';
import { LogTimeOnTaskService } from '../../../service/logTimeOnTask/log-time-on-task.service';
import { Task } from '../../../data/Task';
import { LogTimeFormularComponent } from '../log-time-formular/log-time-formular.component';

@Component({
  selector: 'app-log-time',
  standalone: true,
  imports: [CommonModule, FormsModule, LogTimeFormularComponent],
  templateUrl: './log-time.component.html',
  styleUrl: './log-time.component.css'
})
export class LogTimeComponent {
  @Input() task!:Task;
  timeSpentList: LogTimeOnTask[] = [];
  showLogTimePopup = false;

  constructor(private logTimeOnTaskService: LogTimeOnTaskService) {
    let token: string | null = localStorage.getItem("token");
    if (this.task) {
      this.populateTimeSpentList();
    }
  }
  populateTimeSpentList() {
    this.logTimeOnTaskService.getAllLogsForTask(this.task.id).subscribe({
      next: (response) => {
        this.timeSpentList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openLogTimePage() {
    this.showLogTimePopup = true;
    console.log("showing pop up..." + this.showLogTimePopup)
  }

  closeLogTimePage() {
    this.showLogTimePopup = false;
  }

}
