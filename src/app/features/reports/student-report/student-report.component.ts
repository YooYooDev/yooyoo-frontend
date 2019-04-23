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

  constructor(private userService: UserService, private schoolService: SchoolService, private authService: AuthService) { }
  data: Array<Object>;
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
    this.authService.getuRole().subscribe(res => (this.urole = res));
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.schoolService.getSchools().subscribe(res => {
      this.schoolData = res;
    });
    this.reload();
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }
    onChangeSchool(e): void {
      this.userService.getReportBySchool(e.itemData.id).subscribe(res => {
      // this.school.push(res);
        console.log(res)
      });
      this.userService.getAllStudents(e.itemData.id).subscribe(res => {
        res.filter(user => (user.color = this.randomColorChange()));
        this.users = res;
      });
  }

  onActionComplete(args: SelectEventArgs): void {
    console.log(args);
    this.student = [];
    this.userService.getReportByStudent(args.data['id']).subscribe(res => {
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
    this.userService.getAllStudents(this.schoolId).subscribe(res => {
      res.filter(user => (user.color = this.randomColorChange()));
      this.users = res;
    });
  }
}
