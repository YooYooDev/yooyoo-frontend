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
import { FormGroup } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../../users/user.service';

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
  constructor(
    private toast: ToastService,
    private authService: AuthService,
    private userService: UserService
  ) {}

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

  actionBegin(args: SaveEventArgs): void {

  }
  actionComplete(args: DialogEditEventArgs): void {

  }
  getShortName(fullName): void {
    // tslint:disable-next-line:newline-per-chained-call
    return fullName.split(' ').slice(0, 2).map(n =>  n[0]).join('');
  }
  randomColorChange(): any {
    const allowed = '0369cf'.split('');
    let s = '#';
    while (s.length < 4) {
       s += allowed.splice(Math.floor((Math.random() * allowed.length)), 1);
    }
    return s;
}
  reload(): void {
    this.userService.getAllStudents().subscribe(res => {
      res.filter(user => user.color = this.randomColorChange());
      this.users = res;
    });
  }
}
