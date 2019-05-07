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
import { SchoolService } from '../../school/school.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'yoo-school-report',
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.css'],
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
export class SchoolReportComponent implements OnInit {
  schoolData: any;
  school = [];
  urole: any;
  schoolId: any;
  constructor(private userService: UserService, private schoolService: SchoolService, private authService: AuthService) { }
  @ViewChild('grid1') public grid1: GridComponent;
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
    visible: false,
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
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public data: Array<Object> = [
    { x: 'Topics Assigned', y: 25 },
    { x: 'Topic Viewed', y: 20 },
    { x: 'Question Faced', y: 30 },
    { x: 'Correct Answers', y: 25 },
    { x: 'Videos Watched', y: 18 },
    { x: 'Worksheet Appeared', y: 15 }
  ];

  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: {
        fontWeight: '600', color: '#ffffff'
      }
    }
  };
  public primaryXAxis: Object = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 }
  };
  public primaryYAxis: Object = {
    labelFormat: '{value}',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: {
      color: 'transparent'
    }
  };
 
  ngOnInit(): void {

    this.pageSettings = { pageSize: 15 };
    this.toolbar = ['ExcelExport'];
    this.authService.getuRole().subscribe(res => (this.urole = res));
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.schoolService.getSchools().subscribe(res => {
      this.schoolData = res;
    });
  }

  onToolbarClick(args: ClickEventArgs): void {
    console.log(args.item['properties'].text)
    if (args.item['properties'].text === 'Excel Export') {
      console.log('done');
      this.grid1.excelExport();
    }
  }
  onChangeSchool(e): void {
    this.school = [];
    this.userService.getReportBySchool(e.itemData.id).subscribe(res => {
      this.school.push(res);
      this.grid1.refresh();
      console.log(this.school)
    });

  }

}
