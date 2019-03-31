import {Component, OnInit} from '@angular/core';
import {SurveyBuilderService} from '../survey-builder.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  private _sideNavOpen = true;
  get sideNavOpen(): boolean {
    return this._sideNavOpen;
  }

  set sideNavOpen(value: boolean) {
    this._sideNavOpen = value;
  }

  constructor(private surveyBuilderService: SurveyBuilderService) { }

  ngOnInit() {
  }

}
