import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyRoutingModule } from './notify-routing.module';
import AddNotifyComponent from './Components/add-notify/add-notify.component';
import { ViewNotifyComponent } from './Components/view-notify/view-notify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddNotifyComponent,
    ViewNotifyComponent
  ],
  imports: [
    CommonModule,
    NotifyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class NotifyModule { }
