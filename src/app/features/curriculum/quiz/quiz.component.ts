import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

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
import { ToastService } from 'src/app/shared/services/toast.service';
import { CurriculumService } from '../curriculum.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'yoo-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
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
export class QuizComponent implements OnInit {
  @ViewChild('quizForm') public quizForm: FormGroup;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('element') element;
  public mediaFormData: FormData = new FormData();
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
  quizData = {};
  isValid: Boolean = true;
  errorMsg: String = '';
  successMsg: String = '';
  constructor(
    private curriculumService: CurriculumService,
    private toast: ToastService,
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
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };

    this.reload();
  }

  onToolbarClick(args: ClickEventArgs): void {
    if (args.item['properties'].text === 'Excel Export') {
      this.grid.excelExport();
    }
  }
  onClickAddQuestion(): any {
    this.questions.push({
      question: '',
      answer: '',
      option1: '',
      option2: ''
    });
  }
  removeQuestion(index): any {
    this.questions.splice(index, 1);
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
      } else if (file.type === 'audio/mp3' || file.type === 'audio/wav') {
        if (file.size > 2000000) {
          this.isValid = false;
          this.errorMsg = 'Media file size should be >2mb.';
        } else {
          this.isValid = true;
        }
      }
      if (this.isValid) {
        this.mediaFormData.append('media', file, file.name);
        this.curriculumService
          .uploadMedia(id, this.mediaFormData)
          .subscribe(res => {
            this.successMsg = 'Uploaded successfully!';
          });
      }
    }
  }
  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.requestType = args.requestType;
      this.quizData = { ...args.rowData };
      this.questions = this.quizData['questions'];
      if (
        this.quizData['questions'] !== undefined &&
        this.quizData['questions'].length
      ) {
        this.quizData['questions'].filter((item, index) => {
          this.quizData[`questionId${index}`] = item.id;
          this.quizData[`question${index}`] = item.question;
          this.quizData[`option0_${index}`] = item.option1;
          this.quizData[`option1_${index}`] = item.option2;
          this.quizData[`answer${index}`] =
            item.answer === item.option1 ? '1' : '2';
        });
      } else {
        this.questions = [
          {
            question: '',
            answer: '',
            option1: '',
            option2: ''
          }
        ];
      }
    }
    if (args.requestType === 'save') {
      this.questions.filter((item, index) => {
        item.question = this.quizData[`question${index}`];
        item.option1 = this.quizData[`option0_${index}`];
        item.option2 = this.quizData[`option1_${index}`];
        const answer = this.quizData[`answer${index}`];
        item.answer = item[`option${answer}`];
      });
      const data = {
        topicId: this.quizData['topicId'],
        quizName: this.quizData['quizName'],
        questions: this.questions
      };
      if (this.requestType === 'add') {
        console.log(data);
        this.createQuizs(data);
      } else if (this.requestType === 'beginEdit') {
        data['id'] = args.data['id'];
        this.createQuizs(data);
        console.log(data);
      } else {
      }
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

  createQuizs(formData): void {
    this.curriculumService.createQuiz(formData).subscribe(res => {
      this.toast.success(res.message);
      this.reload();
    });
  }
  reload(): void {
    this.curriculumService.getAllQuizs().subscribe(res => {
      this.quizs = res;
    });
    this.curriculumService.getAllTopics().subscribe(res => {
      this.topics = res;
    });
  }
}
