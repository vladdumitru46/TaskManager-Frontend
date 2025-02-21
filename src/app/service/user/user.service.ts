import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../data/User';
import { Constans } from '../../constans/Constans';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  getAllUsers(): Observable<User[]> {
      return new Observable((observer) => {
        fetch(Constans.getAllUsers , {
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
