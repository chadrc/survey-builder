import {BuilderComponent} from './builder.component';
import {Survey} from '../../shared/models/survey';
import {Observable, of} from 'rxjs';

describe('BuilderComponent', () => {
  let component: BuilderComponent;

  beforeEach(() => {
    component = new BuilderComponent({
      newSurvey(): Observable<Survey> {
        return of(new Survey());
      }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
