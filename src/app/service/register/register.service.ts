import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constans } from '../../constans/Constans';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  regitser(name: string, username: string, email: string, password: string) {
    const body = { name: name, username: username, email: email, password: password };
    return new Observable((observer) => {
      fetch(Constans.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Register failed');
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
