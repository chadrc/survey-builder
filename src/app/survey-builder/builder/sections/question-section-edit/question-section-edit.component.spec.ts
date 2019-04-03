import {QuestionSectionEditComponent} from './question-section-edit.component';
import {SurveyBuilderService} from '../../../survey-builder.service';

describe('QuestionSectionEditComponent', () => {
  let component: QuestionSectionEditComponent;
  let builderService: SurveyBuilderService;

  beforeEach(() => {
    builderService = new SurveyBuilderService();
    component = new QuestionSectionEditComponent(builderService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
