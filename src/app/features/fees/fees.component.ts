import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DialogEditEventArgs,
  EditService,
  EditSettingsModel,
  ExcelExportService,
  FilterService,
  FilterSettingsModel,
  GridComponent,
  IEditCell,
  PageService,
  PageSettingsModel,
  SaveEventArgs,
  SearchSettingsModel,
  SelectionSettingsModel,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
// tslint:disable-next-line:no-implicit-dependencies
import { ToastService } from 'src/app/shared/services/toast.service';
import { FeesService } from './fees.service';

@Component({
  selector: 'yoo-users',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css'],
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
export class FeesComponent implements OnInit {
  @ViewChild('userForm') public userForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('Dialog') Dialog: DialogComponent;
  schoolId = '';
  requestType: string;
  userData = {};
  editparams: { params: { popupHeight: string } };
  editSettings: EditSettingsModel;
  pageSettings: PageSettingsModel;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  selectionOptions: SelectionSettingsModel;
  line = 'Both';
  public header: String = 'Upload Student';
  public showCloseIcon: Boolean = true;
  public width: String = '300px';
  public position: object = { X: 'center', Y: 'center' };
  public numericParams: IEditCell;
  toolbar: Array<string>;
  fees = [];
  formData: any;
  constructor(private toast: ToastService, private feesService: FeesService) { }
  ngOnInit(): void {
    this.pageSettings = { pageSize: 15 };
    this.numericParams = { params: { decimals: 2 } };
    this.toolbar = ['Edit', 'Update', 'Cancel', 'Search', 'ExcelExport'];
    this.searchSettings = {};
    this.filterOptions = { type: 'CheckBox' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: false,
      mode: 'Normal'
    };
    this.selectionOptions = { mode: 'Both' };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.feesService.viewFees().subscribe(res => (this.fees = res));
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
  }

  getBillAmount(id): void {
    // this.fees.filter(res => {
    //   console.log(res, id);
    //   if (res.id === id) {
    //     return res.totalBillAmount;
    //   }
    // });
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
    console.log(args.requestType);
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      console.log(args.rowData);
    }
    if (args.requestType === 'save') {
      // this.editFees(args.rowData);
      this.addFees(args.rowData);
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // args.dialog.buttons[0]['controlParent'].btnObj[0].element.setAttribute(
      //   'class',
      //   'hidden'
      // );
      // args.dialog.buttons[1]['controlParent'].btnObj[1].element.setAttribute(
      //   'class',
      //   'hidden'
      // );
      // if (args.requestType === 'beginEdit') {
      //   (args.form.elements.namedItem('firstName') as HTMLInputElement).focus();
      // } else if (args.requestType === 'add') {
      //   (args.form.elements.namedItem('firstName') as HTMLInputElement).focus();
      // }
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
    // this.feesService.uploadFees(this.formData).subscribe(res => {
    //   this.Dialog.hide();
    //   this.feesService.viewFees().subscribe(res => (this.users = res));
    //   this.toast.success(res.message);
    // });
  }
  editFees(formData): void {
    console.log(formData);
    this.feesService.updateFees(formData).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  addFees(formData): void {
    this.feesService.addFees(formData).subscribe(res => {
      this.toast.success(res.message);
    });
  }
  deleteFees(id): void {
    this.feesService.deleteFees(id).subscribe(res => {
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
