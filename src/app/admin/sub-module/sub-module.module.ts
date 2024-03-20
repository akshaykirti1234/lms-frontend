import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubModuleRoutingModule } from './sub-module-routing.module';
import { AddSubModuleComponent } from './Components/add-sub-module/add-sub-module.component';
import { ViewSubModuleComponent } from './Components/view-sub-module/view-sub-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddSubModuleComponent,
    ViewSubModuleComponent
  ],
  imports: [
    CommonModule,
    SubModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SubModuleModule { }
