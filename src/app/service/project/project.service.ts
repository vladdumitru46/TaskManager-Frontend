import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constans } from '../../constans/Constans';
import { Project } from '../../data/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  populateProjectList(): Observable<Project[]> {
    return new Observable((observer) => {
      fetch(Constans.populateProjectList, {
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

  getProjectByName(name: string): Observable<Project>{
    return new Observable((observer) => {
      fetch(Constans.getProjectByName + name, {
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
