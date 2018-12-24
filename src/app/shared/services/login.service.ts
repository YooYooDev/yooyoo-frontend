import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../core/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  userAuth(formData): any {
    return this._http.post(`${apiUrl}/login` , formData);
  }
}
