import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _toast: ToastService
  ) {}
  canActivate(): boolean {
    console.log(this._authService.isLoggedIn());
    // this._toast.error('Unauthorised Access !');
    if (!this._authService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/dashboard']);
      return false;
    }
  }
}
