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
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { SchoolService } from './school.service';
import { ISchool } from './school';

@Component({
  selector: 'yoo-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
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
export class SchoolComponent implements OnInit {
  schoolData: ISchool;
  @ViewChild('userForm') public schoolForm: FormGroup;
  editparams: { params: { popupHeight: string } };
  schools: any;
  public editSettings: Object;
  pageSettings: PageSettingsModel;
  toolbar: Array<ToolbarItems>;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  groupOptions: GroupSettingsModel;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('gender') gender: DropDownListComponent;
  line = 'Both';
  key: Object = {};

  public genderDdl: Array<string> = ['Male', 'Female', 'Others'];

  constructor(private _schoolService: SchoolService) {}

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

    this._schoolService.getSchools().subscribe(res => (this.schools = res));
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
      // this.schoolData = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      if (this.schoolForm.valid) {
        args.data = this.schoolData;
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
          'student_name'
        ) as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem(
          'student_name'
        ) as HTMLInputElement).focus();
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
