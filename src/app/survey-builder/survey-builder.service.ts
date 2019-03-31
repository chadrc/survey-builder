import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import uuid from 'uuid/v4';
import {Survey} from '../shared/models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyBuilderService {

  constructor() { }

  public newSurvey(): Observable<Survey> {
    const survey = new Survey();
    survey.id = uuid();
    survey.slug = null;
    survey.sections = [];
    survey.startDate = null;
    survey.endDate = null;
    return of(survey);
  }
}
