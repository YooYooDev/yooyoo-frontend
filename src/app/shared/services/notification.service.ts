import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../core/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _http: HttpClient) {}

  saveNotification(formData): any {
    return this._http.post(`${apiUrl}/notifications/save` , formData);
  }
}
