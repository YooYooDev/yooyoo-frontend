import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { ToastService } from './../../shared/services/toast.service';
import { UtilService } from './../../shared/services/util.service';
import { SchoolService } from './../school/school.service';
import { AttendanceService } from './attendence.service';

@Component({
  selector: 'yoo-attendence',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('class') selectedClass;
  classes = [];
  students = [];
  data = [];
  isChanged = false;
  attendedSIds = [];
  constructor(
    private _schoolService: SchoolService,
    private _util: UtilService,
    private _attendanceService: AttendanceService,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    const schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;

    this._schoolService
      .getStudentsByClass(schoolId)
      .pipe(map(res => res))
      .subscribe(res => {
        this.classes = [];
        this.data = res;
        res.map(r => {
          this.classes.push({ name: r.name, id: r.id });
        });
        console.log(this.classes);
      });
  }
  onChangeClass(value): void {
    this.attendedSIds = [];
    this.students = this.data.filter(val => val.id == value)[0].students;
    this.isChanged = true;

    this._attendanceService.getAttendence().subscribe(res => {
      this.attendedSIds = res;
console.log(this.attendedSIds )
    });
  }

  onFormSubmit(f): void {
    const students = f.value;
    const schoolId = this._util.getSchoolId();
    const grade = parseInt(this.selectedClass.value, 10);
    const date = this._util.getFormattedDate();
    const studentList = [];

    Object.keys(students).map(key => {
      if (students[key] !== '') {
        studentList.push({
          studentId: Number(key),
          attendanceStatus: students[key]
        });
      }
    });
    const attendanceData = {
      schoolId,
      grade,
      date,
      studentList
    };

    this._attendanceService.submitAttendance(attendanceData).subscribe(res => {
      if (res) {
        this._toast.success('Attendance submitted successfully!');
      } else {
        this._toast.error('There was an error, please try again!');
      }
    });
  }
}
