import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constans } from '../../constans/Constans';
import { Project } from '../../data/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getAllProjects(): Observable<Project[]> {
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

  getProjectByName(name: string): Observable<Project> {
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
  addPoject(name: string, description: string, endDate: Date) {
    let body = {
      name: name,
      description: description,
      endDate: endDate
    };
    return new Observable((observer) => {
      fetch(Constans.addProject, {
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
