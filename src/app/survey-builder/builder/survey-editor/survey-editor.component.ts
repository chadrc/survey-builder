import {Component, Input} from '@angular/core';
import {Survey} from '../../../shared/models/survey';
import {SurveySection, SurveySectionType} from '../../../shared/models/survey-section';
import {SurveyBuilderService} from '../../survey-builder.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-survey-editor',
  templateUrl: './survey-editor.component.html',
  styleUrls: ['./survey-editor.component.scss']
})
export class SurveyEditorComponent {
  @Input() survey: Survey;

  constructor(
    private surveyBuilderService: SurveyBuilderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }

  get viewLink() {
    return `/survey/${SurveyEditorComponent.surveyPath(this.survey)}`;
  }

  private static surveyPath(survey: Survey): string {
    return survey.slug || survey.id;
  }

  private static surveyBuildPath(survey: Survey): string {
    return `/${SurveyEditorComponent.surveyPath(survey)}`;
  }

  editField<K extends keyof Survey>(field: K, value: Survey[K]) {
    if (field === 'slug') {
      const url = SurveyEditorComponent.surveyBuildPath(this.survey);
      this.location.go(url);
    }

    this.surveyBuilderService.editSurvey(this.survey.id, field, value).subscribe(modifiedSurvey => {
      console.log('modified', modifiedSurvey);
    });
  }

  editSectionField<K extends keyof SurveySection>(sectionId: string, field: K, value: SurveySection[K]) {
    this.surveyBuilderService.editQuestionSection(this.survey.id, sectionId, field, value).subscribe(modifiedSurvey => {
      console.log('modified', modifiedSurvey);
    });
  }

  addSection(type: SurveySectionType) {
    switch (type) {
      case 'question':
        this.addQuestionSection();
        break;
    }
  }

  private addQuestionSection() {
    this.surveyBuilderService.addSectionToSurvey(this.survey.id, 'question').subscribe(survey => {
      const newQuestion = survey.sections[survey.sections.length - 1];
      this.survey.sections.push(newQuestion);
    });
  }
}
