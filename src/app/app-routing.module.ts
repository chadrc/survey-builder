import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'build',
    loadChildren: './survey-builder/survey-builder.module#SurveyBuilderModule'
  },
  {
    path: 'survey',
    loadChildren: './survey/survey.module#SurveyModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
