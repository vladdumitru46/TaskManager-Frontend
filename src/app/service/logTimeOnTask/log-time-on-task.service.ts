import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogTimeOnTask } from '../../data/LogTimeOnTask';
import { Constans } from '../../constans/Constans';
import { AllLoggedTimeForUserResponse } from '../../data/AllLoggedTimeForUserResponse';

@Injectable({
  providedIn: 'root'
})
export class LogTimeOnTaskService {

  constructor() { }

  getAllLogsForUser(token: string): Observable<LogTimeOnTask[]> {
    return new Observable((observer) => {
      fetch(Constans.getAllLogsForUser + token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          if (!response.ok) {
            let error = await response.text();
            throw new Error(error);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });

  }

  getAllLogsForTask(taskId: number): Observable<LogTimeOnTask[]> {
    return new Observable((observer) => {
      fetch(Constans.getAllLogsForTask + taskId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          if (!response.ok) {
            let error = await response.text();
            throw new Error(error);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  logTimeOnTask(description: string, logTime: number, taskId: number, logDate: Date, token: string): Observable<LogTimeOnTask> {
    let body = {
      token: token,
      taskId: taskId,
      description: description,
      numberOfHours: logTime,
      date: logDate
    };
  
    return new Observable((observer) => {
      fetch(Constans.addLogForTask, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(async (response) => {
          if (!response.ok) {
            let error = await response.text();
            throw new Error(error);
          }
          const text = await response.text();
          const data = text ? JSON.parse(text) : null;
  
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  
  getAllLoggedTimeByUserInPeriodOfTime(username: string, startDate: Date, endDate: Date): Observable<AllLoggedTimeForUserResponse> {
    let body = {
      username: username,
      startDate: startDate,
      endDate: endDate
    };
  
    return new Observable((observer) => {
      fetch(Constans.addLogForTaskForUserInPeriodOfTime, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(async (response) => {
          if (!response.ok) {
            let error = await response.text();
            throw new Error(error);
          }
          const text = await response.text();
          const data = text ? JSON.parse(text) : null;
  
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


}
