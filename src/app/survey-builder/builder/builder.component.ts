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
  get sideNavOpen(): boolean {
    return this._sideNavOpen;
  }

  set sideNavOpen(value: boolean) {
    this._sideNavOpen = value;
  }
  get surveys(): Survey[] {
    return this._surveys;
  }
  get selectedSurvey() {
    return this._surveys[this._selectedSurveyIndex];
  }

  get selectedSurveyLink() {
    return this.selectedSurvey ? `${window.location.origin}/survey/${BuilderComponent.surveyPath(this.selectedSurvey)}` : '';
  }

  constructor(
    private surveyBuilderService: SurveyBuilderService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  private _sideNavOpen = true;

  private _surveys: Survey[] = [];

  private _selectedSurveyIndex: number;

  private static surveyPath(survey: Survey): string {
    return survey.slug || survey.id;
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
    return `/build/${BuilderComponent.surveyPath(survey)}`;
  }

  editField<K extends keyof Survey>(field: K, value: Survey[K]) {
    this.surveyBuilderService.editSurvey(this.selectedSurvey.id, field, value).subscribe(modifiedSurvey => {
      console.log('modified', modifiedSurvey);
    });
  }
}
