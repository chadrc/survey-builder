import {BuilderComponent} from './builder.component';
import {SurveyBuilderService} from '../survey-builder.service';

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let builderService: SurveyBuilderService;

  beforeEach(() => {
    builderService = new SurveyBuilderService();
    component = new BuilderComponent(builderService, null, null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
