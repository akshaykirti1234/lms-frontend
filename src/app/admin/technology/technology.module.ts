import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnologyRoutingModule } from './technology-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTechnologyComponent } from './Components/add-technology/add-technology.component';
import { ViewTechnologyComponent } from './Components/view-technology/view-technology.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddTechnologyComponent,
    ViewTechnologyComponent
  ],
  imports: [
    CommonModule,
    TechnologyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TechnologyModule { }
