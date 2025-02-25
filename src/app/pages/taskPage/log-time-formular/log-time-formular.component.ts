import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../data/Task';
import { LogTimeOnTaskService } from '../../../service/logTimeOnTask/log-time-on-task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-time-formular',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './log-time-formular.component.html',
  styleUrl: './log-time-formular.component.css'
})
export class LogTimeFormularComponent implements OnInit{
  description: string = "";
  numberOfHours: number = 0;
  date!: Date ; 

  constructor(
    private logTimeOnTaskService: LogTimeOnTaskService,
    public dialogRef: MatDialogRef<LogTimeFormularComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  ngOnInit() {
    this.date = this.getTodayDate();
  }

  getTodayDate(): Date {
    const today = new Date();
    return today; 
  }

  logTime() {
    let token = localStorage.getItem("token");
    if (token) {
      this.logTimeOnTaskService.logTimeOnTask(
        this.description, this.numberOfHours, this.data.task.id, this.date, token
      ).subscribe({
        next: () => {
          this.dialogRef.close('saved'); 
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close(); 
  }
}
