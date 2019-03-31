import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import {Survey} from '../shared/models/survey';

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
}
