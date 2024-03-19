import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './Components/add-author/add-author.component';
import { ViewAuthorComponent } from './Components/view-author/view-author.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewAuthor', pathMatch: 'full' },
  { path: 'viewAuthor', component: ViewAuthorComponent },
  { path: 'addAuthor', component: AddAuthorComponent },
  { path: 'edit/:id', component: AddAuthorComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
