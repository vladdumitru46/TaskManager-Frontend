import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogTimeOnTask } from '../../data/LogTimeOnTask';
import { Constans } from '../../constans/Constans';

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

   logTimeOnTask(task: LogTimeOnTask, token: string): Observable<LogTimeOnTask> {
      let body = {
        token: token,
        taskId: task.task.id,
        description: task.description,
        numberOfHours: task.logTime,
        date: task.logDate
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
}
