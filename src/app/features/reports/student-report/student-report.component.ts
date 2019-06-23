import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  EditService,
  EditSettingsModel,
  ExcelExportService,
  FilterService,
  FilterSettingsModel,
  GridComponent,
  PageService,
  PageSettingsModel,
  SearchSettingsModel,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { UserService } from '../../users/user.service';
import { SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import { SchoolService } from '../../school/school.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ReportService } from '../report.service';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'yoo-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css'],
  providers: [
    ToolbarService,
    ExcelExportService,
    SortService,
    PageService,
    FilterService,
    EditService
  ],
  encapsulation: ViewEncapsulation.None
})
export class StudentReportComponent implements OnInit {
  student = [];
  schoolData: any;
  school: any;
  urole: any;
  schoolId: any;
  fromDate: any;
  toDate: any;
  schoolValue: any;
  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private schoolService: SchoolService,
    private utilService: UtilService,
    private authService: AuthService) { }
  data: Array<Object>;
  @ViewChild('range') DateRange: DateRangePickerComponent;
  rangeValue: any;
  @ViewChild('grid') public grid: GridComponent;
  editparams: { params: { popupHeight: string } };
  users = [];
  editSettings: EditSettingsModel;
  pageSettings: PageSettingsModel;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  line = 'Both';
  questions = [];
  toolbar: Array<string>;
  quizs = [];
  topics = [];
  FilterData = ['Attendance', 'Fees', 'Assignment'];
  public feesData: Array<Object> = [
    { x: 'L.K.G', y: 300000 },
    { x: 'U.K.G', y: 250000 },
    { x: 'NURSERY', y: 600000 }
  ];
  public attendanceData: Array<Object> = [
    { x: 'L.K.G', y: 120, r: '115' },
    { x: 'U.K.G', y: 130, r: '118.7' },
    { x: 'NURSERY', y: 140, r: '124.6' }
  ];
  // @ViewChild('pie') pie: AccumulationChartComponent | AccumulationChart;
  // custom code end
  public startAngle = 0;
  public endAngle = 360;
  public radius = 'r';
  public enableAnimation = true;
  public enableSmartLabels = true;
  public tooltip: Object = {
    enable: true
  };
  public title = 'Attendance Details';
  // Initializing Legend
  public legendSettings: Object = {
    visible: true,
    position: 'Bottom'
  };
  // Initializing DataLabel
  public dataLabel: Object = {
    visible: true,
    name: 'text',
    position: 'Inside',
    font: {
      fontWeight: '600',
      color: '#ffffff'
    }
  };

  ngOnInit(): void {
    this.pageSettings = { pageSize: 15 };
    this.toolbar = [];
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    this.fromDate = this.utilService.getFormattedDate1(startDate);
    this.toDate = this.utilService.getFormattedDate();
    this.rangeValue = [new Date(startDate), new Date()];
    this.authService.getuRole()
    .subscribe(res => (this.urole = res));
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.schoolService.getSchools()
    .subscribe(res => {
      this.schoolData = res;
      this.schoolValue = res.filter(data => data.id === this.schoolId)[0]['name'];
      console.log(this.schoolValue);
    });
    this.reload();
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }
  onChangeSchool(e): void {
    this.userService.getReportBySchool(e.itemData.id)
    .subscribe(res => {
      // this.school.push(res);
      console.log(res)
    });
    this.userService.getAllStudents(e.itemData.id)
    .subscribe(res => {
      res.filter(user => (user.color = this.randomColorChange()));
      this.users = res;
    });
  }
  onChangeDate(e): void {
    this.rangeValue = this.DateRange.value;
    this.fromDate = this.utilService.getFormattedDate1(this.rangeValue[0]);
    this.toDate = this.utilService.getFormattedDate1(this.rangeValue[1]);
    console.log(this.fromDate, this.toDate);
  }

  onFilterType(e): void {
    const type = e.itemData.value;
    switch (type) {
      case 'Assignment':
        this.reportService.getassignmentreportbyschool(this.schoolId, this.fromDate, this.toDate)
        .subscribe(res => {
            console.log(res);
          });
        break;
      case 'Fees':
        this.reportService.getfeereportbyschool(this.schoolId, this.fromDate, this.toDate)
        .subscribe(res => {
            console.log(res);
          });
        break;
      case 'Attendance':
        this.reportService.getattnreportbyschool(this.schoolId, this.fromDate, this.toDate)
        .subscribe(res => {
            console.log(res);
          });
        break;
      default:
      // code block
    }
  }

  onActionComplete(args: SelectEventArgs): void {
    console.log(args);
    this.student = [];
    this.userService.getReportByStudent(args.data['id'])
    .subscribe(res => {
      this.student.push(res);
    });
  }

  getShortName(fullName): void {
    // tslint:disable-next-line:newline-per-chained-call
    return fullName
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('');
  }
  randomColorChange(): any {
    const allowed = '0369cf'.split('');
    let s = '#';
    while (s.length < 4) {
      s += allowed.splice(Math.floor(Math.random() * allowed.length), 1);
    }

    return s;
  }
  reload(): void {
    this.userService.getAllStudents(this.schoolId)
    .subscribe(res => {
      res.filter(user => (user.color = this.randomColorChange()));
      this.users = res;
    });
  }
}
