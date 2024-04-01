import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssignComponent } from './Components/view-assign/view-assign.component';
import { AddAssignComponent } from './Components/add-assign/add-assign.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewAssign', pathMatch: 'full' },
  { path: 'viewAssign', component: ViewAssignComponent },
  { path: 'addAssign', component: AddAssignComponent },
  { path: 'editAssign/:id', component: AddAssignComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignRoutingModule { }
