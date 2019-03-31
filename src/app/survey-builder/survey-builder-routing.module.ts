import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuilderComponent} from './builder/builder.component';

const routes: Routes = [
  {
    path: '',
    component: BuilderComponent
  },
  {
    path: ':id',
    component: BuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyBuilderRoutingModule { }
