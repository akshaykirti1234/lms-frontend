import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLocationComponent } from './Components/view-location/view-location.component';
import { AddLocationComponent } from './Components/add-location/add-location.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewLocation', pathMatch: 'full' },
  { path: 'viewLocation', component: ViewLocationComponent },
  { path: 'addLocation', component: AddLocationComponent },
  { path: 'editLocation/:id', component: AddLocationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
