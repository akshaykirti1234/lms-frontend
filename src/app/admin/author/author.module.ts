import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAuthorComponent } from './Components/add-author/add-author.component';
import { ViewAuthorComponent } from './Components/view-author/view-author.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddAuthorComponent,
    ViewAuthorComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AuthorModule { }
