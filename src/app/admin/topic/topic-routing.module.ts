import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTopicComponent } from './Components/view-topic/view-topic.component';
import { AddTopicComponent } from './Components/add-topic/add-topic.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewTopic', pathMatch: 'full' },
  { path: 'viewTopic', component: ViewTopicComponent },
  { path: 'addTopic', component: AddTopicComponent },
  { path: 'editTopic/:id', component: AddTopicComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
