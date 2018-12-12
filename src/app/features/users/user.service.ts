import { Users } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(map(res => res));
  }
}
