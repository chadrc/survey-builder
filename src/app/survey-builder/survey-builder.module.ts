import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

import {SurveyBuilderRoutingModule} from './survey-builder-routing.module';
import {BuilderComponent} from './builder/builder.component';

@NgModule({
  declarations: [BuilderComponent],
  imports: [
    CommonModule,
    SurveyBuilderRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class SurveyBuilderModule {
}
