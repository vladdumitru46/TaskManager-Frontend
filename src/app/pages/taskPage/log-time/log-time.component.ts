import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
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
export class LogTimeComponent implements OnChanges, OnInit {
  task = input.required<Task>();
  timeSpentList: LogTimeOnTask[] = [];
  isLogTimeModalOpen = signal(false);

  constructor(private logTimeOnTaskService: LogTimeOnTaskService) { }

  ngOnInit() {
    if (this.task()) {
      this.populateTimeSpentList();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task()) {
      this.populateTimeSpentList();
    }
  }

  populateTimeSpentList() {
    const task = this.task();
    if (!task) {
      console.log("Task is undefined!");
      return;
    }
    console.log("Getting logs for task: ", task.id);

    this.logTimeOnTaskService.getAllLogsForTask(task.id).subscribe({
      next: (response) => {
        this.timeSpentList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openLogTimePage() {
    this.isLogTimeModalOpen.set(true);
  }

  closeLogTimePage() {
    console.log("here")
    this.isLogTimeModalOpen.set(false);
  }

}

