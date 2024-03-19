import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssesmentComponent } from './Components/add-assesment/add-assesment.component';
import { ViewAssessmentComponent } from './Components/view-assessment/view-assessment.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewAssessment', pathMatch: 'full' },
  { path: 'viewAssessment', component: ViewAssessmentComponent },
  { path: 'addAssessment', component: AddAssesmentComponent },
  { path: 'editAssessment/:id', component: AddAssesmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
