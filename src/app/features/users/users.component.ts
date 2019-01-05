import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  Column,
  ColumnMenuService,
  CommandColumnService,
  CommandModel,
  DetailRowService,
  DialogEditEventArgs,
  EditService,
  EditSettingsModel,
  ExcelExportService,
  FilterService,
  FilterSettingsModel,
  GridComponent,
  GroupService,
  GroupSettingsModel,
  IRow,
  PageService,
  PageSettingsModel,
  PdfExportService,
  ReorderService,
  ResizeService,
  RowSelectEventArgs,
  SaveEventArgs,
  SearchSettingsModel,
  SelectionSettingsModel,
  SortService,
  ToolbarItems,
  ToolbarService} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { UserService } from './user.service';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  schoolId = '';
  requestType: string;
  userData = {};
  @ViewChild('userForm') public userForm: FormGroup;
  editparams: { params: { popupHeight: string } };
  users: any;
  public editSettings: EditSettingsModel;
  pageSettings: PageSettingsModel;

  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  groupOptions: GroupSettingsModel;
  public commands: Array<CommandModel>;
  public selectionOptions: SelectionSettingsModel;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('gender') gender: DropDownListComponent;
  @ViewChild('class') class: DropDownListComponent;
  @ViewChild('Dialog') Dialog: DialogComponent;
  @ViewChild('formUpload') public uploadObj: UploaderComponent;
  // @ViewChild('parentMobile1') numeric: NumericTextBoxComponent;
  line = 'Both';
  key: Object = {};

  public header: String = 'Upload Student';
  public showCloseIcon: Boolean = true;
  public width: String = '300px';
  public position: object = { X: 'center', Y: 'center' };
  toolbar: string[];
  constructor(private userService: UserService, private toast: ToastService) {}

  ngOnInit(): void {
    this.pageSettings = { pageSize: 15 };
    this.toolbar = ['Add', 'Edit', 'Search', 'ExcelExport', 'Import'];
    this.searchSettings = {};
    this.filterOptions = { type: 'Excel' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      mode: 'Dialog'
    };
    this.selectionOptions = { checkboxMode: 'ResetOnRowClick' };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.userService.getAllStudents().subscribe(res => (this.users = res));
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    console.log(this.schoolId);
  }

  onToolbarClick(args: ClickEventArgs): void {
    console.log(args.item['properties'].text);
    if (args.item['properties'].text === 'PDF Export') {
      this.grid.pdfExport();
    } else if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    } else if (args.item['properties'].text === 'Import') {
      this.Dialog.show();
    }
  }

  onRowSelected(args: RowSelectEventArgs): void {
    // const selectedrowindex = this.grid.getSelectedRowIndexes();
    // console.log(this.grid.toolbarModule.enableItems);
    // this.grid.toolbarModule.enableItems(['Edit'], false);
    // if (selectedrowindex.length == 1) {
    //   this.grid.toolbarModule.enableItems(['Edit'], true);
    // } else {
    //   this.grid.toolbarModule.enableItems(['Edit'], false);
    // }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.userData = { ...args.rowData };
    } else if (args.requestType === 'delete') {
      if (confirm('Are you sure you want to delete ?')) {
        this.deletStudent(args.data[0].id);
      }
    }
    if (args.requestType === 'save') {
      if (this.userForm.valid) {
        args.data = this.userData;
        args.data['schoolId'] = this.schoolId;
        if (this.requestType === 'beginEdit') {
          this.editStudent(args.data);
        } else if (this.requestType === 'add') {
          this.addStudent(args.data);
        }
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog.buttons[0]['controlParent'].btnObj[0].element.setAttribute(
        'class',
        'hidden'
      );
      args.dialog.buttons[1]['controlParent'].btnObj[1].element.setAttribute(
        'class',
        'hidden'
      );
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('firstName') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('firstName') as HTMLInputElement).focus();
      }
    }
  }
  cancel(): void {
    console.log(this.grid);
    this.grid.closeEdit();
  }
  onSubmit(): void {
    this.grid.endEdit();
  }
  editStudent(formData): void {
    this.userService.updateStudent(formData).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  addStudent(formData): void {
    console.log(formData);
    this.userService.addStudent(formData).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  deletStudent(id): void {
    this.userService.deleteStudent(id).subscribe(res => {
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
