import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../data/Task';
import { Constans } from '../../constans/Constans';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor() { }

  populateTaskList(projectName: string): Observable<Task[]> {
    return new Observable((observer) => {
      fetch(Constans.populateTaskList + projectName, {
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


  getAllStatues(): Observable<string[]> {
    return new Observable((observer) => {
      fetch(Constans.getAllStatuses, {
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

  getTaskByUniqueName(uniqueName: string): Observable<Task> {
    return new Observable((observer) => {
      fetch(Constans.getByUniqueName + uniqueName, {
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

  updateTask(task: Task): Observable<Task> {
    let body = {
      name: task.name,
      description: task.description,
      uniqueName: task.uniqueName,
      username: task.user.username,
      timeSpent: task.numberOfHoursSpent,
      status: task.taskStatus
    };
    return new Observable((observer) => {
      fetch(Constans.updateTask, {
        method: 'PUT',
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

  addTask(name: string, description: string, projectName: string, username: string, timeToComplete: number): Observable<Task> {
    let body = {
      name: name,
      description: description,
      projectName: projectName,
      username: username,
      numberOfHoursToComplete: timeToComplete
    };
    return new Observable((observer) => {
      fetch(Constans.addTask, {
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
