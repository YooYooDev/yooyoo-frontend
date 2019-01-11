import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiUrl } from './../../core/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttendanceService {
  constructor(private _http: HttpClient) {}

  submitAttendance(data): Observable<any> {
    return this._http.post(`${apiUrl}/attendance/save`, data)
            .pipe(map(res => res));
  }

  // getAttendence()
}
