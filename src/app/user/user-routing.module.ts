import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { ViewScheduleComponent } from './Components/view-schedule/view-schedule.component';

const routes: Routes = [
  {
    path: '', component: UserDashboardComponent, children: [
      { path: 'viewSchedule/:subModuleId', component: ViewScheduleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
