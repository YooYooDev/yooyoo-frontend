import { SchoolService } from './../school/school.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'yoo-attendence',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit {
  classes = [];
  students = [];
  data = [];
  isChanged = false;
  constructor(private _schoolService: SchoolService) {}

  ngOnInit() {
    const schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;

    this._schoolService.getStudentsByClass(schoolId).pipe(map(res => res))
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
    console.log(this.data);
    this.students = this.data.filter(val => val.id == value)[0].students;
    this.isChanged = true;
  }
}
