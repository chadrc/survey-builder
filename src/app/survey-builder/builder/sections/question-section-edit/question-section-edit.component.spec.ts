import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionSectionEditComponent} from './question-section-edit.component';

describe('QuestionSectionEditComponent', () => {
  let component: QuestionSectionEditComponent;
  let fixture: ComponentFixture<QuestionSectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
