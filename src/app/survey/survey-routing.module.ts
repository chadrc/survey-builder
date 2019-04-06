import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TakeComponent} from './take/take.component';

const routes: Routes = [
  {
    path: ':id',
    component: TakeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
