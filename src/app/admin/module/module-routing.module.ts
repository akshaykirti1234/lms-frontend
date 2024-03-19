import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModuleComponent } from './Components/add-module/add-module.component';
import { ViewModuleComponent } from './Components/view-module/view-module.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewModule', pathMatch: 'full' },
  { path: 'editModule/:moduleId', component: AddModuleComponent },
  { path: 'addModule', component: AddModuleComponent },
  { path: 'viewModule', component: ViewModuleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
