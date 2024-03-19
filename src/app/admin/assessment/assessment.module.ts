import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AddAssesmentComponent } from './Components/add-assesment/add-assesment.component';
import { ViewAssessmentComponent } from './Components/view-assessment/view-assessment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddAssesmentComponent,
    ViewAssessmentComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AssessmentModule { }
