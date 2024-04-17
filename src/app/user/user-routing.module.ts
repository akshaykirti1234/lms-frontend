import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { ViewScheduleComponent } from './Components/view-schedule/view-schedule.component';
import { ViewMaterialsComponent } from './Components/view-materials/view-materials.component';
import { userAuthGuard } from '../userauth.guard';

const routes: Routes = [
  {
    path: '', component: UserDashboardComponent, children: [
      { path: 'viewSchedule/:subModuleId', component: ViewScheduleComponent },
      { path: 'viewMaterials/:scheduleId', component: ViewMaterialsComponent }
    ],canActivate : [userAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
