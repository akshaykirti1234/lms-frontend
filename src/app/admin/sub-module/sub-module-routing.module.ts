import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSubModuleComponent } from './Components/view-sub-module/view-sub-module.component';
import { AddSubModuleComponent } from './Components/add-sub-module/add-sub-module.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewSubModule', pathMatch: 'full' },
  { path: 'addSubModule', component: AddSubModuleComponent },
  { path: 'edit/:id', component: AddSubModuleComponent },
  { path: 'viewSubModule', component: ViewSubModuleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubModuleRoutingModule { }
