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

  getUserRole(): any {
    return localStorage.getItem('urole');
  }

  removeUserRole(): any {
    return localStorage.removeItem('urole');
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  removeUserInfo(): any {
    return localStorage.removeItem('userInfo');
  }

  getSchoolId(): any {
    return JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
  }

  getFormattedDate(): any {
    const now = new Date();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    return `${now.getDate()}-${months[now.getMonth()]}-${now.getFullYear()}`;
  }
}
