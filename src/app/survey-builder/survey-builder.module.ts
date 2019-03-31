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
  MatNativeDateModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

import {SurveyBuilderRoutingModule} from './survey-builder-routing.module';
import {BuilderComponent} from './builder/builder.component';

@NgModule({
  declarations: [BuilderComponent],
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
    MatNativeDateModule
  ]
})
export class SurveyBuilderModule {
}
