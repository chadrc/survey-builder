import {Component, OnInit} from '@angular/core';
import {SurveyBuilderService} from '../survey-builder.service';
import {Survey} from '../../shared/models/survey';
import {ActivatedRoute, Params} from '@angular/router';

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

  private _selectedSurveyIndex: number;
  get selectedSurvey() {
    return this._surveys[this._selectedSurveyIndex];
  }

  get selectedSurveyLink() {
    return this.selectedSurvey ? `${window.location.origin}/survey/${this.selectedSurvey.id}` : '';
  }

  constructor(
    private surveyBuilderService: SurveyBuilderService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this._selectedSurveyIndex = this.surveys.findIndex(survey => survey.id === id);
    });

    this.surveyBuilderService.getSurveys().subscribe(surveys => {
      this._surveys = surveys;
    });

    const initialId = this.activatedRoute.snapshot.params['id'];
    this._selectedSurveyIndex = this.surveys.findIndex(survey => survey.id === initialId);
  }

  createSurvey() {
    this.surveyBuilderService.newSurvey().subscribe(survey => {
      this.surveys.push(survey);
    });
  }

  surveyLink(survey: Survey) {
    return `/build/${survey.id}`;
  }
}
