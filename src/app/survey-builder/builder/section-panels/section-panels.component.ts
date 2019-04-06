import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from '../../../shared/models/survey';
import {SurveySection} from '../../../shared/models/survey-section';

export interface EditSectionFieldEvent<K extends keyof SurveySection> {
  id: string;
  field: K;
  value: SurveySection[K];
}

@Component({
  selector: 'app-section-panels',
  templateUrl: './section-panels.component.html',
  styleUrls: ['./section-panels.component.scss']
})
export class SectionPanelsComponent implements OnInit {
  @Input() survey: Survey;
  @Output() editSectionFieldEvent = new EventEmitter<EditSectionFieldEvent<any>>();

  constructor() { }

  ngOnInit() {
  }

  editSectionField<K extends keyof SurveySection>(id: string, field: K, value: SurveySection[K]) {
    this.editSectionFieldEvent.emit({id, field, value});
  }
}
