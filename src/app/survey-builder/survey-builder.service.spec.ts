import {TestBed} from '@angular/core/testing';

import {SurveyBuilderService} from './survey-builder.service';

describe('SurveyBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyBuilderService = TestBed.get(SurveyBuilderService);
    expect(service).toBeTruthy();
  });
});
