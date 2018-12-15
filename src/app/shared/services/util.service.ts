import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  getToken(): any {
    return localStorage.getItem('token');
  }

  removeToken(): any {
    return localStorage.removeItem('token');
  }
}
