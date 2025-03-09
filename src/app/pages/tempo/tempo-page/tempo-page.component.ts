import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { AllLoggedTimeForUserResponse } from '../../../data/AllLoggedTimeForUserResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogTimeOnTaskService } from '../../../service/logTimeOnTask/log-time-on-task.service';
import { UserService } from '../../../service/user/user.service';
import { User } from '../../../data/User';
import { LoggedTimeOnTaskPerDay } from '../../../data/LoggedTimeOnTaskPerDay';

@Component({
  selector: 'app-tempo-page',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, FormsModule],
  templateUrl: './tempo-page.component.html',
  styleUrl: './tempo-page.component.css'
})
export class TempoPageComponent implements OnInit {
  allLoggedTimeForUserResponse!: AllLoggedTimeForUserResponse;
  days: string[] = [];
  username: string = "";
  startDate!: Date;
  endDate!: Date;
  user!: User;

  constructor(private logTimeOnTaskService: LogTimeOnTaskService, private userService: UserService) {
    let token = localStorage.getItem("token");
    if (token) {
      this.getUserByToken(token);
      this.setCurrentWeek();
      this.setDaysInRange();
      // this.populateAllLoggedTimeForUserResponseList();
    }

  }

  ngOnInit(): void {



  }

  setDaysInRange() {
    this.days = []; 
    let currentDate = new Date(this.startDate);

    while (currentDate <= this.endDate) {
      let dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      this.days.push(dayName);
      currentDate.setDate(currentDate.getDate() + 1); 
    }
  }

  getTimeLoggedForDay(taskGroup: LoggedTimeOnTaskPerDay, day: string): number {
    let loggedDay = taskGroup.day;
    let dayName = new Date(loggedDay).toLocaleDateString('en-US', { weekday: 'long' });

    return day === dayName ? taskGroup.timeLogged : 0;
  }

  getTotalTimeForDay(day: string): number {
    let totalDay = this.allLoggedTimeForUserResponse.totalLoggedTimeOnTaskPerDays.find(d =>
      new Date(d.date).toLocaleDateString('en-US', { weekday: 'long' }) === day
    );

    return totalDay ? totalDay.totalTime : 0;
  }


  setCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const sundayOffset = mondayOffset + 6;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + mondayOffset);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + sundayOffset);

    this.startDate = startOfWeek;
    this.endDate = endOfWeek;
  }

  updateStartDate(value: string) {
    this.startDate = new Date(value);
    this.setDaysInRange();
  }

  updateEndDate(value: string) {
    this.endDate = new Date(value);
    this.setDaysInRange(); 
  }


  getUserByToken(token: string) {
    this.userService.getByToken(token).subscribe({
      next: (response) => {
        console.log(response);
        this.user = response; 
        if (this.user) {
          console.log("Aici");
          this.username = this.user.username; 
          console.log(this.username);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  populateAllLoggedTimeForUserResponseList() {
    this.logTimeOnTaskService.getAllLoggedTimeByUserInPeriodOfTime(
      this.username,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (response) => {
        this.allLoggedTimeForUserResponse = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getLogDetails(taskGroup: LoggedTimeOnTaskPerDay){
      
  }
}
