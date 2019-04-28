import { Component } from '@angular/core';

@Component({
  selector: 'yoo-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent {

  tabIndex = 0;

  changeTab(event): any {
    this.tabIndex = event.index;
  }
}
