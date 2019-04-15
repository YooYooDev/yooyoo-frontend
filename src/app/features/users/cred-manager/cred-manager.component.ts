import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AutoCompleteComponent,
  DropDownListComponent
} from '@syncfusion/ej2-angular-dropdowns';
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
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { UserService } from '../user.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SchoolService } from '../../school/school.service';

@Component({
  selector: 'yoo-cred-manager',
  templateUrl: './cred-manager.component.html',
  styleUrls: ['./cred-manager.component.css'],
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
export class CredManagerComponent implements OnInit {
  @ViewChild('credManagerForm') public credManagerForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('Dialog') Dialog: DialogComponent;
  @ViewChild('schoolName') schoolObj: AutoCompleteComponent;
  schoolId = '';
  requestType: string;
  credManagerData = {};
  editparams: { params: { popupHeight: string } };
  users: any;
  credManager: any;
  editSettings: EditSettingsModel;
  pageSettings: PageSettingsModel;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
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
    private schoolService: SchoolService
  ) {}
  public roleData = [
    { roleName: 'YOOYOO ADMIN', id: '1' },
    { roleName: 'SUPER ADMIN', id: '2' },
    { roleName: 'SCHOOL OWNER', id: '3' },
    { roleName: 'TEACHER', id: '4' }
  ];
  public roleFields: Object = { text: 'roleName', value: 'id' };
  public schoolFields: Object = { value: 'name', text: 'name' };
  ngOnInit(): void {
    this.pageSettings = { pageSize: 15 };
    this.toolbar = ['Add', 'Search', 'ExcelExport'];
    this.searchSettings = {};
    this.filterOptions = { type: 'Excel' };
    this.editSettings = {
      allowEditing: false,
      allowAdding: true,
      mode: 'Dialog'
    };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.userService
      .getAllCredManager()
      .subscribe(res => (this.credManager = res));
    this.schoolService.getSchools().subscribe(res => (this.schools = res));
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.credManagerData = { ...args.rowData };
    }
    if (args.requestType === 'save') {
      if (this.credManagerForm.valid) {
        args.data = this.credManagerData;
        // console.log(args.data['roleId']);
        // console.log(this.schoolObj['itemData']['id']);
        if (args.data['roleId'] !== '1' && args.data['roleId'] !== '2') {
          args.data['schoolId'] = this.schoolObj['itemData']['id'];
        } else {
          args.data['schoolId'] = '1';
        }

        if (this.requestType === 'add') {
          this.addCredManager(args.data);
        }
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog.width = '800px';
      args.dialog.buttons[0]['controlParent'].btnObj[0].element.setAttribute(
        'class',
        'hidden'
      );
      args.dialog.buttons[1]['controlParent'].btnObj[1].element.setAttribute(
        'class',
        'hidden'
      );
      // if (args.requestType === 'beginEdit') {
      //   (args.form.elements.namedItem('firstName') as HTMLInputElement).focus();
      // } else if (args.requestType === 'add') {
      //   (args.form.elements.namedItem('firstName') as HTMLInputElement).focus();
      // }
    }
  }

  cancel(): void {
    this.grid.closeEdit();
  }
  onSubmit(): void {
    this.grid.endEdit();
  }

  addCredManager(formData): void {
    console.log(formData);
    this.userService.createCredManager(formData).subscribe(res => {
      this.toast.success(res.message);
      this.userService
        .getAllCredManager()
        .subscribe(res => (this.credManager = res));
    });
  }

  focusIn(target: HTMLElement): void {
    target.parentElement.classList.add('e-input-focus');
  }

  focusOut(target: HTMLElement): void {
    target.parentElement.classList.remove('e-input-focus');
  }
}
