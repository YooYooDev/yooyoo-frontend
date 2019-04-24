import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CurriculumService } from '../curriculum/curriculum.service';
import { SchoolService } from '../school/school.service';
import { AssignmentService } from '../assignment/assignment.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'yoo-assignment-school',
  templateUrl: './assignment-school.component.html',
  styleUrls: ['./assignment-school.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentSchoolComponent implements OnInit {
  assignmentsData: any;
  tempassignments = [];
  currentDate: Date;
  filteredBy = '';
  displayDate = '';
  lastday: string;
  firstday: string;
  schoolData: any;
  schoolId = '';
  schools: any;
  urole: any;
  showLoader = false;
  assignments = [];
  gradeData = ['NURSERY', 'L.K.G', 'U.K.G'];
  @ViewChild('Dialog') Dialog: DialogComponent;
  dialogContent: string;
  constructor(
    private assignmentService: AssignmentService,
    private toast: ToastService,
    private curriculumService: CurriculumService,
    private authService: AuthService,
    private utilService: UtilService,
    private schoolService: SchoolService
  ) {}
  ngOnInit(): void {
    this.currentDate = new Date(); // get current date
    this.displayDate = this.onClickDay();
    this.filteredBy = 'day';
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.authService.getuRole().subscribe(res => (this.urole = res));
    this.schoolService.getSchools().subscribe(res => {
      this.schoolData = res;
    });
    if (this.urole !== 'SUPERADMIN' && this.urole !== 'YOOYOOADMIN') {
      this.assignmentService
        .getAllSchoolAssignments(this.schoolId)
        .subscribe(res => {
          this.assignments = res;
          this.tempassignments = res;
          console.log(res);
          this.filterByDate();
          this.showLoader = true;
        });
    }
  }
  onChangeSchool(e): void {
    this.assignmentService
      .getAllSchoolAssignments(e.itemData.id)
      .subscribe(res => {
        this.assignments = res;
        this.tempassignments = res;
        this.assignmentsData = res;
        console.log(res);
        this.filterByDate();
        this.showLoader = true;
      });
  }
  dialogClose(): void {
    this.dialogContent = '';
  }
  onOpenDialog(link): void {
    this.Dialog.show(true);
    this.dialogContent =
      // tslint:disable-next-line:max-line-length
      `<iframe style=\'width:100%;height:100%; overflow: hidden;\' src=\'https://player.vimeo.com/video/${link}\' frameborder=\'0\' allow=\'autoplay; encrypted-media\' webkitallowfullscreen=\'true\' mozallowfullscreen=\'true\' allowfullscreen=\'true\'></iframe>`;
  }
  onClickMethod(e): void {
    this.filteredBy = e;
    switch (e) {
      case 'week':
        this.displayDate = this.onClickWeek();
        break;
      case 'month':
        this.displayDate = this.onClickMonth();
        break;
      case 'day':
        this.displayDate = this.onClickDay();
        break;
      default:
    }
  }
  // onChangeGrade(e): void {
  //   this.tempassignments = this.assignmentsData.filter(data => {
  //     console.log(e.itemData.value, data.grade.name);
  //     if (
  //       e.itemData.value === data.grade.name
  //     ) {
  //       return data;
  //     }
  //   });
  //   this.assignments = this.tempassignments;
  // }
  onShowDialog(link): void {}

  onClickPrevious(): void {
    switch (this.filteredBy) {
      case 'week':
        this.currentDate = new Date(this.currentDate.valueOf() - 518400000);
        this.displayDate = this.onClickWeek();
        break;
      case 'month':
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.displayDate = this.onClickMonth();
        break;
      case 'day':
        this.currentDate = new Date(this.currentDate.valueOf() - 86400000);
        this.displayDate = this.onClickDay();
        break;
      default:
    }
  }
  onClickNext(): void {
    switch (this.filteredBy) {
      case 'week':
        this.currentDate = new Date(this.currentDate.valueOf() + 518400000);
        this.displayDate = this.onClickWeek();
        break;
      case 'month':
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.displayDate = this.onClickMonth();
        break;
      case 'day':
        this.currentDate = new Date(this.currentDate.valueOf() + 86400000);
        this.displayDate = this.onClickDay();
        break;
      default:
    }
  }
  onClickDay(): any {
    this.filterByDate();
    return `${this.utilService.getFormattedDate1(this.currentDate)}`;
  }
  onClickMonth(): any {
    this.filterByMonth();
    return `${this.utilService.getFormattedMonth(this.currentDate)}`;
  }
  onClickWeek(): any {
    this.filterByWeek();
    const curr = new Date(this.currentDate);
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    return `${this.utilService.getFormattedDate1(
      firstday
    )} to ${this.utilService.getFormattedDate1(lastday)}`;
  }
  onClickToday(): void {
    this.currentDate = new Date();
    switch (this.filteredBy) {
      case 'week':
        this.displayDate = this.onClickWeek();
        break;
      case 'month':
        this.displayDate = this.onClickMonth();
        break;
      case 'day':
        this.displayDate = this.onClickDay();
        break;
      default:
    }
  }

  filterByDate(): void {
    this.assignments = this.tempassignments.filter(data => {
      if (
        this.utilService.getFormattedDate1(this.currentDate) ===
        this.utilService.getFormattedDate1(data.date)
      ) {
        return data;
      }
    });
  }
  filterByMonth(): void {
    this.assignments = this.tempassignments.filter(data => {
      console.log(
        this.utilService.getFormattedMonth(this.currentDate),
        this.utilService.getFormattedMonth(data.date)
      );
      if (
        this.utilService.getFormattedMonth(this.currentDate) ===
        this.utilService.getFormattedMonth(data.date)
      ) {
        return data;
      }
    });
  }
  filterByWeek(): void {
    const curr = new Date(this.currentDate);
    let firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    let lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    this.assignments = this.tempassignments.filter(item => {
      const _currDate = this.utilService.weekCompareDates(item.date);
      firstday = this.utilService.weekCompareDates(firstday);
      lastday = this.utilService.weekCompareDates(lastday);
      // console.log(_currDate, '>=' , firstday , '&&' , _currDate , '<=' , lastday);
      // console.log(_currDate >= firstday);
      // console.log(_currDate <= lastday);
      return _currDate >= firstday && _currDate <= lastday;
    });
  }
}
