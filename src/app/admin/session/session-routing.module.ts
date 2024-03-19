import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSessionComponent } from './Components/add-session/add-session.component';
import { ViewSessionComponent } from './Components/view-session/view-session.component';

const routes: Routes = [
  {
    path: 'addSession',
    component: AddSessionComponent
  },
  {
    path: 'viewSession',
    component: ViewSessionComponent
  },
  {
    path: 'editSession/:id',
    component: AddSessionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
