import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
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

@Component({
  selector: 'yoo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
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
export class SettingsComponent implements OnInit {
  @ViewChild('credManagerForm') public credManagerForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;

  requestType: string;
  editparams: { params: { popupHeight: string } };
  users: any;
  editSettings: EditSettingsModel;
  pageSettings: PageSettingsModel;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  line = 'Both';

  toolbar: Array<string>;
  subjects: any;
  categories: any;
  subjectData: any;
  constructor(
    private curriculumService: CurriculumService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 15 };
    this.toolbar = ['Add', 'Update', 'Cancel', 'Search'];
    this.searchSettings = {};
    this.filterOptions = { type: 'CheckBox' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal'
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

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.subjectData = { ...args.rowData };
    } else if (args.requestType === 'delete') {
      if (confirm('Are you sure you want to delete ?')) {
        this.deleteSubjects(args.data[0].id);
      }
    }
    if (args.requestType === 'save') {
      if (this.requestType === 'add') {
        this.createSubjects(args.data);
      } else {
        this.updateSubjects(args.data);
      }
    }
  }
  actionBegin2(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.subjectData = { ...args.rowData };
    }
    if (args.requestType === 'save') {
      if (this.requestType === 'add') {
        this.createCategories(args.data);
      } else {
        this.updateCategories(args.data);
      }
    }
  }

  updateSubjects(formData): void {
    this.curriculumService.updateSubjects(formData)
      .subscribe(res => {
        this.toast.success('Subject updated successfully!');
        this.reload();
      });
  }
  createSubjects(formData): void {
    this.curriculumService.createSubjects(formData)
      .subscribe(res => {
        this.toast.success('Subject created successfully!');
        this.reload();
      });
  }
  deleteSubjects(id): void {
    this.curriculumService.deleteSubjects(id)
      .subscribe(res => {
        this.toast.success('Subject deleted successfully!');
        this.reload();
      });
  }
  updateCategories(formData): void {
    this.curriculumService.updateCategories(formData)
      .subscribe(res => {
        this.toast.success('Successfuly Updated');
        this.reload();
      });
  }
  createCategories(formData): void {
    this.curriculumService.createCategories(formData)
      .subscribe(res => {
        this.toast.success(res);
        this.reload();
      });
  }
  deleteCategories(id): void {
    this.curriculumService.deleteCategories(id)
      .subscribe(res => {
        this.toast.success(res.message);
        this.reload();
      });
  }
  reload(): void {
    this.curriculumService.getAllSubjects()
      .subscribe(res => {
        this.subjects = res;
      });
    this.curriculumService.getAllCategories()
      .subscribe(res => {
        this.categories = res;
      });
  }
}
