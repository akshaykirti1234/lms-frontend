import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotifyUserComponent } from './Components/notify-user/notify-user.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ViewUserComponent } from './Components/view-user/view-user.component';




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
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class ManageUserModule { }
