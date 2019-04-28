import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../../core/auth/auth.service';
import { SchoolService } from '../school/school.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from '@angular/material';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'yoo-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements AfterViewInit, OnInit {
  urole: string;
  notificationForm = new FormGroup({
    schoolId: new FormControl(''),
    schoolName: new FormControl(''),
    gradeId: new FormControl(''),
    studentId: new FormControl(''),
    studentName: new FormControl(''),
    header: new FormControl(''),
    message: new FormControl('')
  });
  filteredSchools: Observable<any>;
  filteredStudents: Observable<any>;

  classes = [];
  students = [];
  data = [];

  @ViewChild('f') notificationFormValues;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  subscription: Subscription;
  schoolId = '';

  constructor(
    private _notificationService: NotificationService,
    private _toastService: ToastService,
    private _authService: AuthService,
    private _schoolService: SchoolService
  ) { }

  ngOnInit() {
    this._authService.getuRole()
      .subscribe(res => (this.urole = res));
    if (this.urole !== 'SUPERADMIN') {
      this.schoolId = JSON.parse(
        localStorage.getItem('userInfo')
      ).schoolInfo.id;
      this.notificationForm.get('schoolId')
        .setValue(this.schoolId);
      this.schoolChange(this.schoolId);
    } else {
      this.disableClass();
    }
    this.disableStudent();
    // school auto complete
    this.filteredSchools = this.notificationForm
      .get('schoolName')
      .valueChanges.pipe(
        startWith(undefined),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filterSchool(val || '');
        })
      );

    // student auto complete
    this.filteredStudents = this.notificationForm
      .get('studentName')
      .valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterStudent(val))
      );
  }

  ngAfterViewInit() {
    this._subscribeToClosingActions();
  }

  private _subscribeToClosingActions(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.trigger.panelClosingActions.subscribe(
      e => {
        if (!e || !e.source) {
          this.notificationForm.get('schoolId').setValue(undefined);
          this.notificationForm.get('schoolName').setValue(undefined);
          this.notificationForm.get('gradeId').setValue(undefined);
          this.notificationForm.get('studentId').setValue(undefined);
          this.notificationForm.get('studentName').setValue(undefined);
          if (this.urole === 'SUPERADMIN') {
            this.disableClass();
          }
          this.disableStudent();
        }
      },
      err => this._subscribeToClosingActions(),
      () => this._subscribeToClosingActions()
    );
  }

  // get selected school value and load classes based on school id
  onChangeSchool(event: MatAutocompleteSelectedEvent): void {
    this.notificationForm.get('gradeId').setValue(undefined);
    this.classes = [];
    this.notificationForm.get('studentId').setValue(undefined);
    this.notificationForm.get('studentName').setValue(undefined);
    this.students = [];
    this.notificationForm.get('schoolName').setValue(event.option.value);
    const schoolId = event.option.id;
    // const schoolId = 1 ;
    this.schoolChange(schoolId);
  }
  schoolChange(schoolId): any {
    // tslint:disable-next-line:newline-per-chained-call
    this.notificationForm.get('schoolId').setValue(schoolId);
    this._schoolService
      .getStudentsByClass(schoolId)
      .pipe(map(res => res))
      .subscribe(res => {
        this.classes = [];
        this.data = res;
        res.map(r => {
          this.classes.push({ name: r.name, id: r.id });
        });
        if (this.classes.length === 0) {
          this._toastService.warning('No class record found');
          this.disableClass();
          this.disableStudent();
        } else {
          this.notificationForm.get('gradeId').enable();
        }
      });
  }
  onChangeClass(value): void {
    this.notificationForm.get('studentId').setValue(undefined);
    this.students = [];
    this.students = this.data.filter(val => val.id === value)[0].students;
    if (this.students.length === 0) {
      this._toastService.warning('No student record found');
      this.notificationForm.get('studentName').disable();
    } else {
      this.notificationForm.get('studentName').enable();
    }
  }

  onChangeStudent(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.notificationForm.get('studentId').setValue(event.option.id);
    this.notificationForm.get('studentName').setValue(event.option.value);
  }

  // school filter
  filterSchool(val: string): Observable<any> {
    return this._schoolService.getAllSchools().pipe(
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

  // student filter
  filterStudent(val: string): any {
    // console.log(val);
    return val
      ? this.students.filter(
        option =>
          option.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1
      )
      : this.students;
  }

  onFormSubmit(): any {
    this._notificationService
      .saveNotification(this.notificationForm.value)
      .subscribe(
        (res: any) => {
          this.notificationFormValues.resetForm();
          this._toastService.success(
            'We have sent a notification successfully!'
          );
          if (this.urole === 'SUPERADMIN') {
            this.disableClass();
          } else {
            this.notificationForm.get('schoolId').setValue(this.schoolId);
          }
          this.disableStudent();

        },
        (err: HttpErrorResponse) => {
          this._toastService.error('Something went wrong!');
        }
      );
  }

  disableClass(): any {
    this.classes = [];
    this.notificationForm.get('gradeId').disable();
  }
  disableStudent(): any {
    this.students = [];
    this.notificationForm.get('studentName').disable();
  }
}
