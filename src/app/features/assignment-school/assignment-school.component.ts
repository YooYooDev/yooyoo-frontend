import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from './../../core/auth/auth.service';
import { SchoolService } from '../school/school.service';
import { AssignmentService } from '../assignment/assignment.service';
import { UtilService } from './../../shared/services/util.service';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  showDate = false;
  showLoader = false;
  assignments = [];
  gradeData = ['NURSERY', 'L.K.G', 'U.K.G'];
  @ViewChild('Dialog') Dialog: DialogComponent;
  @ViewChild('range') DateRange: DateRangePickerComponent;
  dialogContent: string;
  constructor(
    private assignmentService: AssignmentService,
    private authService: AuthService,
    private utilService: UtilService,
    private schoolService: SchoolService,
    private toast: ToastService
  ) { }
  ngOnInit(): void {
    this.currentDate = new Date(); // get current date
    this.displayDate = this.onClickDay();
    this.filteredBy = 'day';
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.authService.getuRole()
      .subscribe(res => (this.urole = res));
    this.schoolService.getSchools()
      .subscribe(res => {
        this.schoolData = res;
      });
    this.reload();
  }
  reload(): void {
     if (this.urole !== 'SUPERADMIN' && this.urole !== 'YOOYOOADMIN') {
      this.assignmentService
        .getAllSchoolAssignments(this.schoolId)
        .subscribe(res => {
          this.assignments = res;
          this.tempassignments = res;
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
        this.filterByDate();
        this.showLoader = true;
      });
  }
  onSelectDate(e, formData): void {
    const toDate = this.utilService.getFormattedDate1(e.value);
    const data = {
      toDate,
      id: formData.id
   };
    this.assignmentService.editAssignment(data)
      .subscribe(res => {
        this.toast.success(res.message);
        this.reload();
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
  openWorksheet(link): void {
    this.Dialog.show(true);
    this.dialogContent =
      // tslint:disable-next-line:max-line-length
      `<iframe style=\'width:100%;height:100%; overflow: hidden;\' src=\'${link}\' frameborder=\'0\' allow=\'autoplay; encrypted-media\' allowfullscreen=\'\'></iframe>`;
  }
  onClickPrevious(): void {
    this.currentDate = new Date(this.currentDate.valueOf() - 86400000);
    this.DateRange.value = [];
    this.displayDate = this.onClickDay();
  }
  onClickNext(): void {
    this.currentDate = new Date(this.currentDate.valueOf() + 86400000);
    this.DateRange.value = [];
    this.displayDate = this.onClickDay();
  }
  onClickDay(): any {
    this.filterByDate();
    return `${this.utilService.getFormattedDate1(this.currentDate)}`;
  }
  
  onClickToday(): void {
    this.DateRange.value = [];
    this.currentDate = new Date();
    this.displayDate = this.onClickDay();
  }

  filterByDate(): void {
    this.assignments = this.tempassignments.filter(data => {
      const current = new Date(this.utilService.getFormattedDate1(this.currentDate));
      const start = new Date(this.utilService.getFormattedDate1(data.date));
      const end = new Date(this.utilService.getFormattedDate1(data.toDate));
      if (
       current >= start && current <= end
      ) {
        return data;
      }
    });
  }
    deposit(): void {
    const start = new Date(this.utilService.getFormattedDate1(this.DateRange.startDate));
    const end = new Date(this.utilService.getFormattedDate1(this.DateRange.endDate));
    if (this.DateRange.startDate != null) {
      // tslint:disable-next-line:max-line-length
      this.displayDate = `${this.utilService.getFormattedDate1(this.DateRange.startDate)} to ${this.utilService.getFormattedDate1(this.DateRange.endDate)}`;
      this.assignments = this.tempassignments.filter(data => {
        const from = new Date(this.utilService.getFormattedDate1(data.date));
        const to = new Date(this.utilService.getFormattedDate1(data.toDate));
        // console.log(from, start, to, end);
        // tslint:disable-next-line:max-line-length
        // console.log(start >= from, start >= to, end >= from, end >= to, start <= from, start <= to, end <= from, end <= to);
        if (end >= from && start <= from && start <= to) {
          return data;
        }
      });
    }
  }
}
