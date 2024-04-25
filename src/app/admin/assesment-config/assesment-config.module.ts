import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssesmentConfigRoutingModule } from './assesment-config-routing.module';
import { AddAssesmentConfigComponent } from './Components/add-assesment-config/add-assesment-config.component';
import { ViewAssesmentConfigComponent } from './Components/view-assesment-config/view-assesment-config.component';


@NgModule({
  declarations: [
    AddAssesmentConfigComponent,
    ViewAssesmentConfigComponent
  ],
  imports: [
    CommonModule,
    AssesmentConfigRoutingModule
  ]
})
export class AssesmentConfigModule { }
