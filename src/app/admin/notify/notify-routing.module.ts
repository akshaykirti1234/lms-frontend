import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AddNotifyComponent from './Components/add-notify/add-notify.component';
import { ViewNotifyComponent } from './Components/view-notify/view-notify.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewNotify', pathMatch: 'full' },
  { path: 'viewNotify', component: ViewNotifyComponent },
  { path: 'addNotify', component: AddNotifyComponent },
  { path: 'editNotify/:id', component: AddNotifyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifyRoutingModule { }
