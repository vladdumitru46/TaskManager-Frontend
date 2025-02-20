import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constans } from '../../constans/Constans';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    const body = { usernameOrEmail: usernameOrEmail, password: password };
    return new Observable((observer) => {
      fetch(Constans.logIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.text();
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
