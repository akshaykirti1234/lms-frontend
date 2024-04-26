import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssesmentConfigRoutingModule } from './assesment-config-routing.module';
import { AddAssesmentConfigComponent } from './Components/add-assesment-config/add-assesment-config.component';
import { ViewAssesmentConfigComponent } from './Components/view-assesment-config/view-assesment-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddAssesmentConfigComponent,
    ViewAssesmentConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AssesmentConfigRoutingModule
  ]
})
export class AssesmentConfigModule { }
