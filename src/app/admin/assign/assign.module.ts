import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignRoutingModule } from './assign-routing.module';
import { AddAssignComponent } from './Components/add-assign/add-assign.component';
import { ViewAssignComponent } from './Components/view-assign/view-assign.component';


@NgModule({
  declarations: [
    AddAssignComponent,
    ViewAssignComponent
  ],
  imports: [
    CommonModule,
    AssignRoutingModule
  ]
})
export class AssignModule { }
