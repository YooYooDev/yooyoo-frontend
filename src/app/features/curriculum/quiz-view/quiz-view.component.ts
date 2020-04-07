import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { apiUrl } from '../../../core/api';
import { CurriculumService } from '../curriculum.service';

@Component({
  selector: 'yoo-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuizViewComponent implements OnInit {
  @ViewChild('quizForm') public quizForm: FormGroup;
  @ViewChild('element') element;
  quizs: any;
  questions: any;
  quizData: any;
  constructor(
    private curriculumService: CurriculumService
  ) { }

  ngOnInit(): void {
    this.reload();
  }
  reload(): void {
    this.curriculumService.getAllQuizs()
      .subscribe(res => {
        this.quizs = res;
        this.questions = this.quizData['questions'];
        if (
          this.quizData['questions'] !== undefined &&
          this.quizData['questions'].length
        ) {
          this.quizData['questions'].filter((item, index) => {
            this.quizData[`imageUrl${index}`] = `${apiUrl}/media/getMedia/${item.id}`;
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
      });
  }
}
