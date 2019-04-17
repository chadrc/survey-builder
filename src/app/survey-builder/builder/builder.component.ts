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
  private _selectedSurveyIndex: number;

  constructor(
    private surveyBuilderService: SurveyBuilderService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  get selectedSurvey() {
    return this._surveys[this._selectedSurveyIndex];
  }

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

  private static surveyPath(survey: Survey): string {
    return survey.slug || survey.id;
  }

  private static surveyBuildPath(survey: Survey): string {
    return `/${BuilderComponent.surveyPath(survey)}`;
  }

  private static matchSurveyPath(id): (survey: Survey) => boolean {
    return (survey) => survey.slug === id || survey.id === id;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this._selectedSurveyIndex = this.surveys.findIndex(BuilderComponent.matchSurveyPath(id));
    });

    this.surveyBuilderService.getSurveys().subscribe(surveys => {
      this._surveys = surveys;
    });

    const initialId = this.activatedRoute.snapshot.params['id'];
    this._selectedSurveyIndex = this.surveys.findIndex(BuilderComponent.matchSurveyPath(initialId));
  }

  createSurvey() {
    this.surveyBuilderService.newSurvey().subscribe(survey => {
      this.surveys.push(survey);
    });
  }

  surveyLink(survey: Survey) {
    return BuilderComponent.surveyBuildPath(survey);
  }
}
