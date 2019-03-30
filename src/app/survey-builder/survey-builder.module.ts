import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyBuilderRoutingModule } from './survey-builder-routing.module';
import { BuilderComponent } from './builder/builder.component';

@NgModule({
  declarations: [BuilderComponent],
  imports: [
    CommonModule,
    SurveyBuilderRoutingModule
  ]
})
export class SurveyBuilderModule { }
