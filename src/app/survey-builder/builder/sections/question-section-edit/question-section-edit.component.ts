import {Component, Input, OnInit} from '@angular/core';
import {QuestionSection} from '../../../../shared/models/survey-sections/question-section';
import {SurveyBuilderService} from '../../../survey-builder.service';
import {QuestionSectionAnswer} from '../../../../shared/models/survey-sections/question-section-answer';

@Component({
  selector: 'app-question-section-edit',
  templateUrl: './question-section-edit.component.html',
  styleUrls: ['./question-section-edit.component.scss']
})
export class QuestionSectionEditComponent implements OnInit {
  private _answers: QuestionSectionAnswer[] = [];

  get answers(): QuestionSectionAnswer[] {
    return this._answers;
  }

  set answers(value: QuestionSectionAnswer[]) {
    this._answers = value;
  }

  @Input() surveyId: string;
  @Input() section: QuestionSection;

  constructor(private surveyBuilderService: SurveyBuilderService) {
  }

  ngOnInit() {
    this.answers = this.section.answers;
  }

  editSectionField<K extends keyof QuestionSection>(field: K, value: QuestionSection[K]) {
    this.surveyBuilderService.editQuestionSection(this.surveyId, this.section.id, field, value).subscribe(modifiedSurvey => {
      console.log('modified survey', modifiedSurvey);
    });
  }

  editAnswerField<K extends keyof QuestionSectionAnswer>(answerId: string, field: K, value: QuestionSectionAnswer[K]) {
    this.surveyBuilderService.editQuestionSectionAnswer(
      this.surveyId,
      this.section.id,
      answerId,
      field,
      value
    ).subscribe(modifiedSurvey => {
      console.log('modified survey', modifiedSurvey);
    });
  }

  addAnswer() {
    this.surveyBuilderService.addAnswerToQuestionSection(this.surveyId, this.section.id).subscribe(modifiedSurvey => {
      this.answers = (modifiedSurvey.sections
        .find(s => s.id === this.section.id) as QuestionSection).answers;
    });
  }

  makeCorrect(answerId: string) {
    this.section.correctAnswer = answerId;
    this.editSectionField('correctAnswer', answerId);
  }
}
