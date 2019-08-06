import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
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
  urole = '';
  enableAttendance = 0;
  enableFees = 0;
  enablePrintedWorksheet = 0;
  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _utilService: UtilService,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private el: ElementRef, private renderer: Renderer
  ) { }

  ngOnInit() {
    if (this._authService.isLoggedIn()) {
      this.fullName = this._utilService.getUserInfo().fullName;
      this.enableAttendance = this._utilService.getUserInfo().schoolInfo.enableAttendance;
      this.enableFees = this._utilService.getUserInfo().schoolInfo.enableFees;
      this.enablePrintedWorksheet = this._utilService.getUserInfo().schoolInfo.enablePrintedWorksheet;
    }
    this._authService.getuRole()
      .subscribe(
        res => this.urole = res
      );
    this._notificationService.getSchoolNotification()
    .subscribe(
      (data: any) => {
        this.notifications = data;
        this.notificationCount = this.notifications.length;
        console.log(this.notifications.length);
      },
      (err: HttpErrorResponse) => {
        this._toast.error('Something went wrong');
      }
    );

  }
  onMenuClick(): void {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.navbar-custom'), 'in', false);
  }
  logOut(): void {
    this._utilService.removeToken();
    this._utilService.removeUserRole();
    this._utilService.removeUserInfo();
    this._router.navigate(['/login']);
    this._toast.success('Logged out successfully!');
  }
}
