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
}
