import { users } from './user.data';
import { IUser } from './user';
import { apiUrl } from '../../core/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<any> {
    return observableOf(users);
    //   return this.httpClient
    //     .get('https://jsonplaceholder.typicode.com/users')
    //     .pipe(map(res => res));
  }

  createUser(formData) {
    return this._http.post(`${apiUrl}/students/create`, formData).pipe(map(res => res));
  }
}
