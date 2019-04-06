import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SurveyBuilderService} from '../survey-builder.service';
import {Survey} from '../../shared/models/survey';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveySection, SurveySectionType} from '../../shared/models/survey-section';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  private _selectedSurveyIndex: number;

  constructor(
    private surveyBuilderService: SurveyBuilderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }

  get selectedSurvey() {
    return this._surveys[this._selectedSurveyIndex];
  }

  get selectedSurveyLink() {
    return this.selectedSurvey ? `${window.location.origin}/survey/${BuilderComponent.surveyPath(this.selectedSurvey)}` : '';
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
    return `/build/${BuilderComponent.surveyPath(survey)}`;
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

  addSection(type: SurveySectionType) {
    switch (type) {
      case 'question':
        this.addQuestionSection();
        break;
    }
  }

  surveyLink(survey: Survey) {
    return BuilderComponent.surveyBuildPath(survey);
  }

  editField<K extends keyof Survey>(field: K, value: Survey[K]) {
    if (field === 'slug') {
      const url = BuilderComponent.surveyBuildPath(this.selectedSurvey);
      this.location.go(url);
    }

    this.surveyBuilderService.editSurvey(this.selectedSurvey.id, field, value).subscribe(modifiedSurvey => {
      console.log('modified', modifiedSurvey);
    });
  }

  editSectionField<K extends keyof SurveySection>(sectionId: string, field: K, value: SurveySection[K]) {
    this.surveyBuilderService.editQuestionSection(this.selectedSurvey.id, sectionId, field, value).subscribe(modifiedSurvey => {
      console.log('modified', modifiedSurvey);
    });
  }

  private addQuestionSection() {
    this.surveyBuilderService.addSectionToSurvey(this.selectedSurvey.id, 'question').subscribe(survey => {
      this._surveys[this._selectedSurveyIndex] = survey;
    });
  }
}
