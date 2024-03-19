import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { AddScheduleComponent } from './Components/add-schedule/add-schedule.component';
import { ViewScheduleComponent } from './Components/view-schedule/view-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleFilterPipe } from './Pipes/schedule-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddScheduleComponent,
    ViewScheduleComponent,
    ScheduleFilterPipe,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ScheduleModule { }
