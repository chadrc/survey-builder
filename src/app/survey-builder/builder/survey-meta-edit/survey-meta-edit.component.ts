import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Survey} from '../../../shared/models/survey';

export interface EditSurveyFieldEvent<K extends keyof Survey> {
  field: K;
  value: Survey[K];
}

@Component({
  selector: 'app-survey-meta-edit',
  templateUrl: './survey-meta-edit.component.html',
  styleUrls: ['./survey-meta-edit.component.scss']
})
export class SurveyMetaEditComponent {
  @Input() survey: Survey;
  @Output() editSurveyFieldEvent = new EventEmitter<EditSurveyFieldEvent<keyof Survey>>();

  editField<K extends keyof Survey>(field: K, value: Survey[K]) {
    this.editSurveyFieldEvent.emit({field, value});
  }
}
