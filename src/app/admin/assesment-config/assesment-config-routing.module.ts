import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssesmentConfigComponent } from './Components/add-assesment-config/add-assesment-config.component';
import { ViewAssesmentConfigComponent } from './Components/view-assesment-config/view-assesment-config.component';

const routes: Routes = [
  {path : 'add' , component : AddAssesmentConfigComponent},
  {path : 'view' , component : ViewAssesmentConfigComponent},
  {path : 'edit/:id' , component : AddAssesmentConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssesmentConfigRoutingModule { }
