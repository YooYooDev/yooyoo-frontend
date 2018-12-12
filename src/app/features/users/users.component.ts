import { UserService } from './user.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  ColumnMenuService,
  DetailRowService,
  ExcelExportService,
  FilterService,
  FilterSettingsModel,
  GridComponent,
  GroupService,
  GroupSettingsModel,
  PageService,
  PageSettingsModel,
  PdfExportService,
  ReorderService,
  ResizeService,
  SearchSettingsModel,
  SortService,
  ToolbarItems,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Users } from './user';

@Component({
  selector: 'yoo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    ToolbarService,
    PdfExportService,
    ExcelExportService,
    ReorderService,
    DetailRowService,
    SortService,
    ResizeService,
    GroupService,
    ColumnMenuService,
    PageService,
    FilterService
  ],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: any;
  pageSettings: PageSettingsModel;
  toolbar: Array<ToolbarItems>;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  groupOptions: GroupSettingsModel;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  line = 'Both';
  key: Object = {};

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.pageSettings = { pageSize: 15 };
    this.toolbar = ['Search', 'ExcelExport', 'PdfExport'];
    this.searchSettings = {};
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };

    this._userService.getUsers().subscribe(res => (this.users = res));
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Pdf Export') {
      this.grid.pdfExport();
    } else if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }

  onRowSelected(e): void {
    const rowData = '';
    this.key = {
      selectedUser: e.data.name,
      values: rowData[0]
    };
  }
}
