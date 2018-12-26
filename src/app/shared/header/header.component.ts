import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UtilService } from '../services/util.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'yoo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fullName: string;

  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _utilService: UtilService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    if (this._authService.isLoggedIn()) {
      this.fullName = this._utilService.getUserInfo().fullName;
    }
  }

  logOut(): void {
    this._utilService.removeToken();
    this._utilService.removeUserRole();
    this._utilService.removeUserInfo();
    this._router.navigate(['/logout']);
    this._toast.success('Logged out successfully!');
  }
}
