import { CommonModule } from '@angular/common';
import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogTimeOnTask } from '../../../data/LogTimeOnTask';
import { LogTimeOnTaskService } from '../../../service/logTimeOnTask/log-time-on-task.service';
import { Task } from '../../../data/Task';
import { LogTimeFormularComponent } from '../log-time-formular/log-time-formular.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-log-time',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './log-time.component.html',
  styleUrl: './log-time.component.css'
})
export class LogTimeComponent implements OnChanges, OnInit {
  @Input() task!: Task;
  timeSpentList: LogTimeOnTask[] = [];
  isLogTimeModalOpen = false;

  constructor(private logTimeOnTaskService: LogTimeOnTaskService, private dialog: MatDialog ) {}

  ngOnInit() {
    if (this.task) {
      this.populateTimeSpentList();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.populateTimeSpentList();
    }
  }

  populateTimeSpentList() {
    if (!this.task) {
      console.log("Task is undefined!");
      return;
    }
    console.log("Getting logs for task: ", this.task.id);

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
    const dialogRef = this.dialog.open(LogTimeFormularComponent, {
      width: '400px',
      data: { task: this.task } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        window.location.reload();
      }
    });
  }

}

