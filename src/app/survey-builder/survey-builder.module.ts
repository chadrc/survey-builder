import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

import {SurveyBuilderRoutingModule} from './survey-builder-routing.module';
import {BuilderComponent} from './builder/builder.component';
import {QuestionSectionEditComponent} from './builder/sections/question-section-edit/question-section-edit.component';
import {SectionPanelsComponent} from './builder/section-panels/section-panels.component';
import {SurveyMetaEditComponent} from './builder/survey-meta-edit/survey-meta-edit.component';

@NgModule({
  declarations: [BuilderComponent, QuestionSectionEditComponent, SectionPanelsComponent, SurveyMetaEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    SurveyBuilderRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
  ]
})
export class SurveyBuilderModule {
}
