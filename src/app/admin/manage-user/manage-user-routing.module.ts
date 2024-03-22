import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { NotifyUserComponent } from './Components/notify-user/notify-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewUser', pathMatch: 'full' },
  { path: 'viewUser', component: ViewUserComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'editUser/:userId', component: AddUserComponent },
  { path: 'notifyUser', component: NotifyUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
