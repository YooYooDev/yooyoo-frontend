import { apiUrl } from '../../core/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeesService {
  constructor(private httpClient: HttpClient) {}

  viewFees(schoolId): Observable<any> {
    return this.httpClient
      .get(`${apiUrl}/fees/getAllStudents/${schoolId}`)
      .pipe(map(res => res));
  }
  addFees(formData): Observable<any> {
    console.log(formData);
    return this.httpClient
      .post(`${apiUrl}/fees/save`, formData)
      .pipe(map(res => res));
  }
  updateFees(formData): Observable<any> {
    return this.httpClient
      .post(`${apiUrl}/fees/update`, formData)
      .pipe(map(res => res));
  }

  deleteFees(id): Observable<any> {
    return this.httpClient
      .delete(`${apiUrl}/fees/delete/${id}`)
      .pipe(map(res => res));
  }
}
