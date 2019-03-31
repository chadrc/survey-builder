import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import {Survey} from '../shared/models/survey';
import {SurveySection, SurveySectionType} from '../shared/models/survey-section';
import {QuestionSection} from '../shared/models/survey-sections/question-section';
import {QuestionSectionAnswer} from '../shared/models/survey-sections/question-section-answer';

@Injectable({
  providedIn: 'root'
})
export class SurveyBuilderService {
  private _surveys: Survey[] = [];

  constructor() {
  }

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

  public addAnswerToQuestionSection(surveyId: string, sectionId: string): Observable<Survey> {
    const survey = this._surveys.find(s => s.id === surveyId);
    const section = survey.sections.find(s => s.id === sectionId) as QuestionSection;

    const newAnswer = new QuestionSectionAnswer();
    newAnswer.id = uuid();
    newAnswer.text = null;

    section.answers.push(newAnswer);

    return of(_.cloneDeep(survey));
  }

  public editSurvey<K extends keyof Survey>(id: string, field: K, value: Survey[K]): Observable<Survey> {
    const survey = this._surveys.find(s => s.id === id);
    survey[field] = value;
    return of(_.cloneDeep(survey));
  }

  public editQuestionSection<K extends keyof QuestionSection>(
    surveyId: string,
    sectionId: string,
    field: K,
    value: QuestionSection[K]
  ): Observable<Survey> {
    const survey = this._surveys.find(s => s.id === surveyId);
    const section = survey.sections.find(s => s.id === sectionId) as QuestionSection;
    section[field] = value;
    return of(_.cloneDeep(survey));
  }

  public editQuestionSectionAnswer<K extends keyof QuestionSectionAnswer>(
    surveyId: string,
    sectionId: string,
    answerId: string,
    field: K,
    value: QuestionSectionAnswer[K]
  ): Observable<Survey> {
    const survey = this._surveys.find(s => s.id === surveyId);
    const section = survey.sections.find(s => s.id === sectionId) as QuestionSection;
    const answer = section.answers.find(a => a.id === answerId);
    answer[field] = value;
    return of(_.cloneDeep(survey));
  }
}
