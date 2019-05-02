import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { apiUrl } from '../../../core/api';
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
import { ToastService } from './../../../shared/services/toast.service';
import { CurriculumService } from '../curriculum.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'yoo-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css'],
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
export class WorksheetComponent implements OnInit {
  @ViewChild('worksheetForm') public worksheetForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('Dialog') Dialog: DialogComponent;
  public worksheetFormData: FormData = new FormData();
  requestType: string;
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
  worksheetData = {};
  isValid: Boolean = true;
  dialogContent: string;
  errorMsg: String = '';
  successMsg: String = '';
  apiUrl: string;
  constructor(
    private curriculumService: CurriculumService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.apiUrl = apiUrl;
    this.pageSettings = { pageSize: 15 };
    this.toolbar = ['Edit', 'Search'];
    this.searchSettings = {};
    this.filterOptions = { type: 'CheckBox' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: false,
      mode: 'Dialog'
    };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };

    this.reload();
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }
  dialogClose(): void {
    this.dialogContent = '';
  }
  openWorksheet(link): void {
    this.Dialog.show(true);
    this.dialogContent =
      // tslint:disable-next-line:max-line-length
      `<iframe style=\'width:100%;height:100%; overflow: hidden;\' src=\'${link}\' frameborder=\'0\' allow=\'autoplay; encrypted-media\' allowfullscreen=\'\'></iframe>`;
  }
  onFileChange(event, id): any {
    this.errorMsg = '';
    this.successMsg = '';
    this.isValid = true;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log(file);
      if (
        file.type === 'image/gif' ||
        file.type === 'image/png' ||
        file.type === 'image/jpeg'
      ) {
        if (file.size > 500000) {
          this.isValid = false;
          this.errorMsg = 'Media file size should be >500kb.';
        } else {
          this.isValid = true;
        }
      }
      this.worksheetFormData.append('media', file, file.name);
      // if (this.isValid) {
      //   this.worksheetFormData.append('media', file, file.name);
      //   this.curriculumService
      //     .uploadWorksheet(id, this.worksheetFormData)
      //     .subscribe(res => {
      //       this.successMsg = 'Uploaded successfully!';
      //     });
      // }
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.worksheetData = { ...args.rowData };
    }

    if (args.requestType === 'save') {
      console.log(args.data, this.worksheetData);
      this.worksheetFormData.append('worksheetlink', this.worksheetData['worksheetLink']);
      console.log(this.worksheetFormData);
      this.updateworksheet(this.worksheetData['id'], this.worksheetFormData);
      this.worksheetFormData = new FormData();
      args.cancel = false;
    }
  }
  actionComplete(args: DialogEditEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      args.dialog.width = '600px';
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

  cancel(): void {
    this.grid.closeEdit();
  }
  onSubmit(): void {
    this.grid.endEdit();
  }

  updateworksheet(id, formData): void {
    this.curriculumService.updateworksheet(id, formData)
      .subscribe(res => {
     
      this.toast.success(res.message);
      this.reload();
    });
  }
  reload(): void {
    this.curriculumService.getAllTopics()
      .subscribe(res => {
      this.topics = res;
    });
  }
}
