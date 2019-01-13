import { UtilService } from './../../shared/services/util.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiUrl } from './../../core/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttendanceService {
  constructor(private _http: HttpClient, private _util: UtilService) {}

  submitAttendance(data): Observable<any> {
    console.log(data);
    return this._http.post(`${apiUrl}/attendance/save`, data)
            .pipe(map(res => res));
  }

 getAttendence(): Observable<any> {
   const schoolId = this._util.getSchoolId();

   return this._http.get(`${apiUrl}/attendance/load/${schoolId}`)
             .pipe(map(res => res));
 }
}
