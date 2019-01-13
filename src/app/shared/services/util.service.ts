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

  compareDates(date) {
    // date - 'yyyy-mm-dd'
    const now = new Date();

    let dayofMonth = now.getDate();
    dayofMonth = dayofMonth < 10 ? `0${dayofMonth}` : `${dayofMonth}`;

    let month = now.getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;

    const formattedDate = `${now.getFullYear()}-${month}-${dayofMonth}`;

    if (date === formattedDate) {
      return true;
    } else {
      return false;
    }
  }
}
