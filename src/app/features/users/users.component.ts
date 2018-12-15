import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ColumnMenuService,
  DetailRowService,
  DialogEditEventArgs,
  EditService,
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
  SaveEventArgs,
  SearchSettingsModel,
  SortService,
  ToolbarItems,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

import { UserService } from './user.service';

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
    FilterService,
    EditService
  ],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  userData: Object;
  @ViewChild('userForm') public userForm: FormGroup;
  editparams: { params: { popupHeight: string } };
  users: any;
  public editSettings: Object;
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
    this.toolbar = [
      'Add',
      'Edit',
      'Delete',
      'Search',
      'ExcelExport',
      'PdfExport'
    ];
    this.searchSettings = {};
    this.filterOptions = { type: 'Excel' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };

    this._userService.getUsers().subscribe(res => (this.users = res));
  }

  onToolbarClick(args: ClickEventArgs): void {
    console.log(args.item['properties'].text);
    if (args.item['properties'].text === 'PDF Export') {
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

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.userData = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      if (this.userForm.valid) {
        args.data = this.userData;
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem(
          'CustomerName'
        ) as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
      }
    }
  }

  focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }

  focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
}
