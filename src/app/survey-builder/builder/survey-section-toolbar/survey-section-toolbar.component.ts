import {Component, EventEmitter, Output} from '@angular/core';
import {SurveySectionType} from '../../../shared/models/survey-section';

@Component({
  selector: 'app-survey-section-toolbar',
  templateUrl: './survey-section-toolbar.component.html',
  styleUrls: ['./survey-section-toolbar.component.scss']
})
export class SurveySectionToolbarComponent {
  @Output() addSection = new EventEmitter<SurveySectionType>();

  constructor() { }

  emitAddSection(type: SurveySectionType) {
    this.addSection.emit(type);
  }
}
