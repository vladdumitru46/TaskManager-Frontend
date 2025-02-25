import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../data/User';
import { Constans } from '../../constans/Constans';
import { TaskPageComponent } from '../../pages/taskPage/task-page/task-page.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(): Observable<User[]> {
    return new Observable((observer) => {
      fetch(Constans.getAllUsers, {
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

  logout(token: string) {
    let body = { token: token }
    return new Observable((observer) => {
      fetch(Constans.logout, {
        method: 'DELETE',
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

  getByToken(token: string):Observable<User>{
    return new Observable((observer) => {
      fetch(Constans.getByToken + token, {
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
