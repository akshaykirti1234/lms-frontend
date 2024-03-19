import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTechnologyComponent } from './Components/add-technology/add-technology.component';
import { ViewTechnologyComponent } from './Components/view-technology/view-technology.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewSchedule', pathMatch: 'full' },
  { path: 'viewTechnology', component: ViewTechnologyComponent },
  { path: 'addTechnology', component: AddTechnologyComponent },
  { path: 'editTechnology/:id', component: AddTechnologyComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnologyRoutingModule { }
