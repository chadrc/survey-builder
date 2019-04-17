import {SurveyEditorComponent} from './survey-editor.component';
import {SurveyBuilderService} from '../../survey-builder.service';

describe('SurveyEditorComponent', () => {
  let component: SurveyEditorComponent;
  let builderService: SurveyBuilderService;

  beforeEach(() => {
    builderService = new SurveyBuilderService();
    component = new SurveyEditorComponent(builderService, null, null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
