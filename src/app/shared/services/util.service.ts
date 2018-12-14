import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  getToken(): any {
    localStorage.getItem('token');
  }
}
