import {TestBed} from '@angular/core/testing';

import {SurveyBuilderService} from './survey-builder.service';
import {Survey} from '../shared/models/survey';

describe('SurveyBuilderService', () => {
  let service: SurveyBuilderService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SurveyBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('newSurvey', () => {
    it('should create survey with default values', done => {
      service.newSurvey().subscribe((survey: Survey) => {
        expect(survey.id).toBeTruthy();
        expect(survey.slug).toBeNull();
        expect(survey.sections).toEqual([]);
        expect(survey.startDate).toBeNull();
        expect(survey.endDate).toBeNull();
        done();
      });
    });
  });
});
