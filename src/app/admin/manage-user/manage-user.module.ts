import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ViewUserComponent } from './Components/view-user/view-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotifyUserComponent } from './Components/notify-user/notify-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'


@NgModule({
  declarations: [
    AddUserComponent,
    ViewUserComponent,
    NotifyUserComponent
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ]
})
export class ManageUserModule { }
