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
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { AssignmentService } from './assignment.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CurriculumService } from '../curriculum/curriculum.service';

@Component({
  selector: 'yoo-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
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
export class AssignmentComponent implements OnInit {
  @ViewChild('assignmentForm') public assignmentForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  @ViewChild('gender') gender: DropDownListComponent;
  @ViewChild('class') class: DropDownListComponent;
  @ViewChild('Dialog') Dialog: DialogComponent;
  @ViewChild('formUpload') public uploadObj: UploaderComponent;
  schoolId = '';
  requestType: string;
  assignmentData = {};
  credManagerData = {};
  editparams: { params: { popupHeight: string } };
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
  assignments = [];
  gradeData = ['NURSERY', 'L.K.G', 'U.K.G'];
  subjects = [];
  topicData: any;
  constructor(
    private assignmentService: AssignmentService,
    private toast: ToastService,
    private curriculumService: CurriculumService,
    private authService: AuthService,
    private utilService: UtilService
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
    this.excelExportProperties = {
      fileName: 'Users.xlsx'
    };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this.schoolId = JSON.parse(localStorage.getItem('userInfo')).schoolInfo.id;
    this.authService.getuRole().subscribe(res => (this.urole = res));
    this.editparams = { params: { popupHeight: '600px' } };
    this.reload();
    this.curriculumService.getAllSubjects().subscribe(res => {
      this.subjects = res;
    });
  }
  rowDataBound(args: RowDataBoundEventArgs): void {
    if (args.data['deleted']) {
      args.row.classList.add('deleted');
    }
  }
  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport(this.excelExportProperties);
    } else if (args.item['properties'].text === 'Import') {
      this.Dialog.show();
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.assignmentData = { ...args.rowData };
    } else if (args.requestType === 'delete') {
      if (confirm('Are you sure you want to delete ?')) {
        this.deleteAssignment(args.data[0].id);
      }
    }
    if (args.requestType === 'save') {
      if (this.assignmentForm.valid) {
        //  this.assignmentData['schoolId'] = this.schoolId;
        const date = this.utilService.getFormattedDate1(args.data['date']);
        this.assignmentData['date'] = date;
        // this.assignmentData['gradeId'] = args.data['gradeId'];
       // console.log(args.data);
        console.log(this.assignmentData);
        if (this.requestType === 'beginEdit') {
          //  this.editAssignment(this.assignmentData);
        } else if (this.requestType === 'add') {
           this.saveAssignment(this.assignmentData);
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
  onSubjectChange(event): void {
    console.log(event.itemData.id);
    this.assignmentService
      .getTopicsBySubject(event.itemData.id)
      .subscribe(res => {
        this.topicData = res;
      });
  }
  // editAssignment(formData): void {
  //   this.assignmentService.updateAssignment(formData).subscribe(res => {
  //     this.toast.success(res.message);
  //     this.reload();
  //   });
  // }
  saveAssignment(formData): void {
    this.assignmentService.saveAssignment(formData).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  deleteAssignment(id): void {
    this.assignmentService.deleteAssignment(id).subscribe(res => {
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
    this.assignmentService.getAllAssignments().subscribe(res => {
      this.assignments = res;
      // res.filter(data => {
      //   if (data.deleted) {
      //     data.status = 'Inactive';
      //   } else {
      //     data.status = 'Active';
      //   }
      //   return data;
      // });
      this.showLoader = true;
    });
  }
}
