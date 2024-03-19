import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddSessionComponent } from './Components/add-session/add-session.component';
import { ViewSessionComponent } from './Components/view-session/view-session.component';


@NgModule({
  declarations: [
    AddSessionComponent,
    ViewSessionComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SessionModule { }
