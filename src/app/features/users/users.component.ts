import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
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
  RowDataBoundEventArgs,
  SaveEventArgs,
  SearchSettingsModel,
  SelectionSettingsModel,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { UserService } from './user.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'yoo-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
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
export class UsersComponent implements OnInit {
  @ViewChild('userForm') public userForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('gender') gender: DropDownListComponent;
  @ViewChild('class') class: DropDownListComponent;
  @ViewChild('Dialog') Dialog: DialogComponent;
  @ViewChild('formUpload') public uploadObj: UploaderComponent;
  schoolId = '';
  requestType: string;
  userData = {};
  credManagerData = {};
  editparams: { params: { popupHeight: string } };
  users: any;
  credManager: any;
  editSettings: EditSettingsModel;
  pageSettings: PageSettingsModel;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  selectionOptions: SelectionSettingsModel;
  line = 'Both';
  public formData: FormData = new FormData();
  public header: String = 'Upload Student';
  public showCloseIcon: Boolean = true;
  public width: String = '300px';
  public position: object = { X: 'center', Y: 'center' };
  toolbar: Array<string>;
  schools: any;
  constructor(
    private userService: UserService,
    private toast: ToastService,
    private utilService: UtilService

  ) {}
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
    this.selectionOptions = { mode: 'Both' };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.reload();
  }
  rowDataBound(args: RowDataBoundEventArgs): void {
    if (args.data['deleted']) {
      args.row.classList.add('deleted');
    }
  }
  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'PDF Export') {
      this.grid.pdfExport();
    } else if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    } else if (args.item['properties'].text === 'Import') {
      this.Dialog.show();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.userData = { ...args.rowData };
    } else if (args.requestType === 'delete') {
      if (confirm('Are you sure you want to delete ?')) {
        this.deleteStudent(args.data[0].id);
      }
    }
    if (args.requestType === 'save') {
      if (this.userForm.valid) {
        args.data = this.userData;
        args.data['schoolId'] = this.schoolId;
        const date = this.utilService.getFormattedDate2(args.data['dob']);
        args.data['dob'] = date;
        if (this.requestType === 'beginEdit') {
          console.log(args.data);
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

    }
  }
  onUploadSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('File uploaded successfully');
    }
  }
  onFileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formData.append('file', file, file.name);
    }
  }
  cancel(): void {
    this.grid.closeEdit();
  }
  onSubmit(): void {
    this.grid.endEdit();
  }
  uploadSubmit(): void {
    this.userService.uploadStudents(this.formData).subscribe(res => {
      this.Dialog.hide();
      this.reload();
      this.toast.success(res.message);
    });
  }
  editStudent(formData): void {
    this.userService.updateStudent(formData).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  addStudent(formData): void {
    this.userService.addStudent(formData).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  deleteStudent(id): void {
    this.userService.deleteStudent(id).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }

  focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
  reload(): void {
    this.userService.getAllStudents().subscribe(res => {
      this.users = res;
      res.filter(data => {
        if (data.deleted) {
          data.status = 'Inactive';
        } else {
          data.status = 'Active';
        }
        return data;
      });
    });
  }
}
