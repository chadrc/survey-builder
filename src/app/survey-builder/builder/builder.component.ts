import {Component, OnInit} from '@angular/core';
import {SurveyBuilderService} from '../survey-builder.service';
import {Survey} from '../../shared/models/survey';

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

  private _surveys: Survey[] = [];

  get surveys(): Survey[] {
    return this._surveys;
  }

  constructor(private surveyBuilderService: SurveyBuilderService) { }

  ngOnInit() {
    this.surveyBuilderService.getSurveys().subscribe(surveys => {
      this._surveys = surveys;
    });
  }

  createSurvey() {
    this.surveyBuilderService.newSurvey().subscribe(survey => {
      this.surveys.push(survey);
    });
  }
}
