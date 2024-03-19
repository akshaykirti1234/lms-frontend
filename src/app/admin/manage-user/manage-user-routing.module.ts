import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { AddUserComponent } from './Components/add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewUser', pathMatch: 'full' },
  { path: 'viewUser', component: ViewUserComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'editUser/:id', component: AddUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
