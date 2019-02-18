import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DialogEditEventArgs,
  EditService,
  EditSettingsModel,
  ExcelExportProperties,
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
import {
  DropDownListComponent,
  MultiSelectComponent,
  SelectEventArgs
} from '@syncfusion/ej2-angular-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { CurriculumService } from './curriculum.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'yoo-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
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
export class CurriculumComponent implements OnInit {
  @ViewChild('curriculumForm') public curriculumForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('subjectName') subjectName: DropDownListComponent;
  @ViewChild('categoryName') categoryName: MultiSelectComponent;

  @ViewChild('Dialog') Dialog: DialogComponent;
  @ViewChild('formUpload') public uploadObj: UploaderComponent;
  schoolId = '';
  requestType: string;
  curriculumData = {};
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
  public maxDate: Date = new Date();
  toolbar: Array<string>;
  schools: any;
  excelExportProperties: ExcelExportProperties;
  urole: any;
  showLoader = false;
  subjects: any;
  categories: any;
  constructor(
    private curriculumService: CurriculumService,
    private toast: ToastService,
    private utilService: UtilService,
    private authService: AuthService
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

    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.authService.getuRole().subscribe(res => (this.urole = res));
    this.curriculumService.getAllSubjects().subscribe(res => {
      this.subjects = res;
    });
    this.curriculumService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    // this.Dialog.hide();
    this.reload();
  }
  rowDataBound(args: RowDataBoundEventArgs): void {
    if (args.data['deleted']) {
      args.row.classList.add('deleted');
    }
  }
  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport(this.excelExportProperties);
    } 
  }
  onOpenDialog(event: any): void {
    this.Dialog.show();
}
  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.curriculumData = { ...args.rowData };
      
    } else if (args.requestType === 'delete') {
      if (confirm('Are you sure you want to delete ?')) {
        // this.deleteStudent(args.data[0].id);
      }
    }
    if (args.requestType === 'save') {
      if (this.curriculumForm.valid) {
        const cat = this.curriculumData['categoryName'];
        const categories = this.categories.filter(obj => {
          return cat.some(obj2 => {
              return obj.name === obj2;
          });
      });
        this.curriculumData['categories'] = categories;
        this.curriculumData['subjects'] = this.subjectName['itemData'];
        console.log(this.curriculumData);
        if (this.requestType === 'beginEdit') {
         this.updateTopic(this.curriculumData);
        } else if (this.requestType === 'add') {
          this.createTopic(this.curriculumData);
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

  cancel(): void {
    this.grid.closeEdit();
  }
  onSubmit(): void {
    this.grid.endEdit();
  }

  updateTopic(formData): void {
    this.curriculumService.updateTopic(formData).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  createTopic(formData): void {
    this.curriculumService.createTopic(formData).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  deleteTopic(id): void {
    this.curriculumService.deleteTopic(id).subscribe(res => {
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
    this.curriculumService.getAllTopics().subscribe(res => {
      this.users = res;
      res.filter(data => {
        data.categoryName = Array.prototype.map
          .call(data.categories, s => s.name);
        if (data.subjects !== null) {
            data.subjectName = data.subjects.name;
          } else{
            data.subjectName = '';
          }
        return data;
      });
      console.log(this.users);
      this.showLoader = true;
    });
  }
}
