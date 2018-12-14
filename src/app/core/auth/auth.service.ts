import { Injectable } from '@angular/core';
import { UtilService } from '../../shared/services/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _utilService: UtilService) {}

  isLoggedIn(): boolean {
    return !!this._utilService.getToken();
  }
}
