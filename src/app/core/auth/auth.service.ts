import { Injectable } from '@angular/core';
import { UtilService } from '../../shared/services/util.service';
import { of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urole = observableOf('');

  constructor(private _utilService: UtilService) {}

  isLoggedIn(): boolean {
    return !!this._utilService.getToken();
  }

  setUserRole(role: string): void {
    this.urole = observableOf(role);
  }
}
