import { users } from './user.data';
import { Users } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return observableOf(users);
  //   return this.httpClient
  //     .get('https://jsonplaceholder.typicode.com/users')
  //     .pipe(map(res => res));
  }
}
