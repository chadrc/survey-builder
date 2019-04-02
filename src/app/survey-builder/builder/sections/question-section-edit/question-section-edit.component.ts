import {Component, Input, OnInit} from '@angular/core';
import {QuestionSection} from '../../../../shared/models/survey-sections/question-section';
import {SurveyBuilderService} from '../../../survey-builder.service';

@Component({
  selector: 'app-question-section-edit',
  templateUrl: './question-section-edit.component.html',
  styleUrls: ['./question-section-edit.component.scss']
})
export class QuestionSectionEditComponent implements OnInit {
  @Input() surveyId: string;
  @Input() section: QuestionSection;

  constructor(private surveyBuilderService: SurveyBuilderService) { }

  ngOnInit() {
  }

  editSectionField<K extends keyof QuestionSection>(field: K, value: QuestionSection[K]) {
    this.surveyBuilderService.editQuestionSection(this.surveyId, this.section.id, field, value).subscribe(modifiedSurvey => {
      console.log('modified survey', modifiedSurvey);
    });
  }
}
