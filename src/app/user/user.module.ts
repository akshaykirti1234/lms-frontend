import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewScheduleComponent } from './Components/view-schedule/view-schedule.component';
import { ViewMaterialsComponent } from './Components/view-materials/view-materials.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    UserDashboardComponent,
    ViewScheduleComponent,
    ViewMaterialsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class UserModule { }
