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
  private readonly _surveys: Survey[] = [];

  constructor() {
    const item = localStorage.getItem('surveys');
    if (item) {
      this._surveys = JSON.parse(item);
    }
  }

  public newSurvey(): Observable<Survey> {
    const survey: Survey = {
      id: uuid(),
      name: 'New Survey',
      slug: null,
      sections: [],
      startDate: null,
      endDate: null,
    };

    this._surveys.push(survey);

    localStorage.setItem('surveys', JSON.stringify(this._surveys));

    return of(_.cloneDeep(survey));
  }

  public getSurveys(): Observable<Survey[]> {
    return of(_.cloneDeep(this._surveys));
  }

  public addSectionToSurvey(id: string, type: SurveySectionType): Observable<Survey> {
    let newSection: SurveySection = null;
    switch (type) {
      case 'question':
        const questionSection: QuestionSection = {
          id: uuid(),
          type: 'question',
          name: 'New Section',
          question: null,
          correctAnswer: null,
          answers: [],
        };

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

    const newAnswer = {
      id: uuid(),
      text: null,
    };

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

  public deleteSurvey(id: string): Observable<string> {
    const index = this._surveys.findIndex(s => s.id === id);
    this._surveys.splice(index, 1);
    return of('ok');
  }

  public deleteSurveySection(surveyId: string, sectionId: string): Observable<Survey> {
    const survey = this._surveys.find(s => s.id === surveyId);
    const index = survey.sections.findIndex(s => s.id === sectionId);
    survey.sections.splice(index, 1);
    return of(_.cloneDeep(survey));
  }

  public deleteQuestionSectionAnswer(surveyId: string, sectionId: string, answerId: string): Observable<Survey> {
    const survey = this._surveys.find(s => s.id === surveyId);
    const section = survey.sections.find(s => s.id === sectionId) as QuestionSection;
    const index = section.answers.findIndex(a => a.id === answerId);
    section.answers.splice(index, 1);
    return of(_.cloneDeep(survey));
  }
}
