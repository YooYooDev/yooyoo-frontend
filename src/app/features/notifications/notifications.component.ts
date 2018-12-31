import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../../core/auth/auth.service';
import { SchoolService } from '../school/school.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  map,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'yoo-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  urole: string;
  allschools: any = [];
  @ViewChild('f') notificationFormValues;

  myControl = new FormControl();
  filteredOptions: Observable<any>;

  constructor(
    private _notificationService: NotificationService,
    private _toastService: ToastService,
    private _authService: AuthService,
    private _getAllSchools: SchoolService
  ) {}

  ngOnInit() {
    this._authService.getuRole().subscribe(res => (this.urole = res));

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(undefined),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '');
      })
    );
  }

  filter(val: string): Observable<any> {
    return this._getAllSchools.getAllSchools().pipe(
      map(response =>
        response.filter(option => {
          return (
            option.name.toLowerCase().indexOf(val.toString().toLowerCase()) ===
            0
          );
        })
      )
    );
  }

  onFormSubmit(f): any {
    // console.log(f.value);
    this._notificationService.saveNotification(f.value).subscribe(
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
