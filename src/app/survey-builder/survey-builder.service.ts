import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import {Survey} from '../shared/models/survey';
import {SurveySection, SurveySectionType} from '../shared/models/survey-section';
import {QuestionSection} from '../shared/models/survey-sections/question-section';

@Injectable({
  providedIn: 'root'
})
export class SurveyBuilderService {
  private _surveys: Survey[] = [];

  constructor() { }

  public newSurvey(): Observable<Survey> {
    const survey = new Survey();
    survey.id = uuid();
    survey.slug = null;
    survey.sections = [];
    survey.startDate = null;
    survey.endDate = null;

    this._surveys.push(survey);

    return of(_.cloneDeep(survey));
  }

  public getSurveys(): Observable<Survey[]> {
    return of(_.cloneDeep(this._surveys));
  }

  public addSectionToSurvey(id: string, type: SurveySectionType): Observable<Survey> {
    let newSection: SurveySection = null;
    switch (type) {
      case 'question':
        const questionSection = new QuestionSection();
        questionSection.id = uuid();
        questionSection.question = null;
        questionSection.correctAnswer = null;
        questionSection.answers = [];

        newSection = questionSection;
        break;
    }

    const survey = this._surveys.find(s => s.id === id);

    survey.sections.push(newSection);

    return of(_.cloneDeep(survey));
  }
}
