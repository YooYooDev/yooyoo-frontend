import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { ToastService } from './../../shared/services/toast.service';
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
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SchoolService } from './school.service';
import { ISchool } from './school';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';

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
  constructor(
    private schoolService: SchoolService,
    private toast: ToastService
  ) {}
  requestType: string;
  schoolData = {};
  @ViewChild('numeric') numeric: NumericTextBoxComponent;
  @ViewChild('schoolForm') public schoolForm: FormGroup;
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
  @ViewChild('template') template: DialogComponent;
  line = 'Both';
  key: Object = {};

  public genderDdl: Array<string> = ['Male', 'Female', 'Others'];

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

    this.schoolService.getSchools().subscribe(res => (this.schools = res));
  }
  onToolbarClick(args: ClickEventArgs): void {
    console.log(args.item['properties'].text);
    if (args.item['properties'].text === 'PDF Export') {
      this.grid.pdfExport();
    } else if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    } else if (args.item['properties'].text === 'Import') {
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
      this.requestType = args.requestType;
      this.schoolData = { ...args.rowData };
    }
    if (args.requestType === 'save') {
      if (this.schoolForm.valid) {
        args.data = this.schoolData;
        if (this.requestType === 'beginEdit') {
          this.editSchoolData(args.data);
        } else if (this.requestType === 'add') {
          this.addSchoolData(args.data);
        }
      } else {
        args.cancel = true;
      }
    }

    if (args.requestType === 'delete') {
      this.deletSchoolData(args.data[0].id);
    }
  }

  actionComplete(args: DialogEditEventArgs): void {

    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // args.dialog.buttons[0].controlParent.btnObj[0].element.setAttribute('disabled', 'disabled');
      // Set initail Focus
    if (args.requestType === 'beginEdit') {
    } else if (args.requestType === 'add') {
      // args.form.ej2_instances[0].rules = {
      //   'code': { required: [true, 'Number is required'] }
      // };
      //  args.form.ej2_instances[0].addRules('code', );
    }
    }
    }
  editSchoolData(data): void {
    this.schoolService.updateSchool(data).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  addSchoolData(data): void {
    this.schoolService.addSchool(data).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  deletSchoolData(id): void {
    this.schoolService.deleteSchool(id).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }

  focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
}
