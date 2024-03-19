import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduleComponent } from './Components/add-schedule/add-schedule.component';
import { ViewScheduleComponent } from './Components/view-schedule/view-schedule.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewSchedule', pathMatch: 'full' },
  { path: 'viewSchedule', component: ViewScheduleComponent },
  { path: 'addSchedule', component: AddScheduleComponent },
  { path: 'editSchedule/:scheduleForId', component: AddScheduleComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
