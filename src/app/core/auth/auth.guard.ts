import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _toast: ToastService
  ) {}
  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      this._toast.error('Unauthorised Access !');

      return false;
    }
  }
}
