import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '', component: UserDashboardComponent, children: [
      // { path: 'notify', loadChildren: () => import('./notify/notify.module').then(m => m.NotifyModule) },
      // { path: 'assign', loadChildren: () => import('./assign/assign.module').then(m => m.AssignModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
