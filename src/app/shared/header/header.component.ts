import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UtilService } from '../services/util.service';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'yoo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fullName: string;
  notifications: [];
  notificationCount: number;

  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _utilService: UtilService,
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this._authService.isLoggedIn()) {
      this.fullName = this._utilService.getUserInfo().fullName;
    }

    this._notificationService.getAllNotification().subscribe(
      (data: any) => {
        this.notifications = data ;
        this.notificationCount = this.notifications.length;
        console.log(this.notifications.length);
      },
      (err: HttpErrorResponse) => {
        this._toast.error('Something went wrong');
      }
    );

  }

  logOut(): void {
    this._utilService.removeToken();
    this._utilService.removeUserRole();
    this._utilService.removeUserInfo();
    this._router.navigate(['/logout']);
    this._toast.success('Logged out successfully!');
  }
}
