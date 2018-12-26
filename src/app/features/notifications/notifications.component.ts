import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'yoo-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @ViewChild('f') notificationFormValues;
  constructor(
    private _notificationService: NotificationService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {}

  onFormSubmit(f) {
    // console.log(f.value);
    this._notificationService.saveNotification(f.value)
    .subscribe(
      (res: any) => {
        this.notificationFormValues.resetForm();
        this._toastService.success('We have sent a notification successfully!');
      },
      (err: HttpErrorResponse) => {
        this._toastService.error('Something went wrong!');
      }
    );
  }
}
