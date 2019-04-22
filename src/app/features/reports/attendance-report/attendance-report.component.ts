import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { employeeData } from './data';
import {
  DialogEditEventArgs,
  EditService,
  EditSettingsModel,
  ExcelExportService,
  FilterService,
  FilterSettingsModel,
  GridComponent,
  PageService,
  PageSettingsModel,
  SaveEventArgs,
  SearchSettingsModel,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../../users/user.service';
import {
  AccumulationChart,
  AccumulationChartComponent,
  AccumulationTheme,
  IAccLoadedEventArgs
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'yoo-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
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
export class AttendanceReportComponent implements OnInit {
  constructor(
    private toast: ToastService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  data: Array<Object>;
  @ViewChild('grid') public grid: GridComponent;
  editparams: { params: { popupHeight: string } };
  users: any;
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
    { x: 'U.K.G', y: 250000},
    { x: 'NURSERY', y: 600000}
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
    this.toolbar = ['Add', 'Edit', 'Search'];
    this.searchSettings = {};
    this.filterOptions = { type: 'CheckBox' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      mode: 'Dialog'
    };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.data = employeeData;
    this.reload();
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }

  actionBegin(args: SaveEventArgs): void {}
  actionComplete(args: DialogEditEventArgs): void {}
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
    this.userService.getAllStudents().subscribe(res => {
      res.filter(user => (user.color = this.randomColorChange()));
      this.users = res;
    });
  }
}
