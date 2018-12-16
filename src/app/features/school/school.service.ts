import { schools } from './school.data';
import { ISchool } from './school';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  constructor(private httpClient: HttpClient) {}

  getSchools(): Observable<any> {
    return observableOf(schools);
    //   return this.httpClient
    //     .get('https://jsonplaceholder.typicode.com/users')
    //     .pipe(map(res => res));
  }
}
