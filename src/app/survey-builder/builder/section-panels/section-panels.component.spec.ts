import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionPanelsComponent} from './section-panels.component';

describe('SectionPanelsComponent', () => {
  let component: SectionPanelsComponent;
  let fixture: ComponentFixture<SectionPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
