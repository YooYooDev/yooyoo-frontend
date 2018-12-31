import { schools } from './school.data';
import { ISchool } from './school';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../core/api';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  constructor(private httpClient: HttpClient) {}

  getSchools(): Observable<any> {
   // return observableOf(schools);
      return this.httpClient
        .get(`${apiUrl}/schools/load`)
        .pipe(map(res => res));
  }
  updateSchool(schoolData): Observable<any> {
      return this.httpClient
        .post(`${apiUrl}/schools/edit`, schoolData)
        .pipe(map(res => res));
  }
  addSchool(schoolData): Observable<any> {
      return this.httpClient
        .post(`${apiUrl}/schools/save`, schoolData)
        .pipe(map(res => res));
  }
  deleteSchool(id): Observable<any> {
      return this.httpClient
        .post(`${apiUrl}/schools/delete/${id}`, '')
        .pipe(map(res => res));
  }
}

