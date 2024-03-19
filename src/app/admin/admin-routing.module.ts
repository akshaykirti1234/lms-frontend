import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [

  {
    path: '', component: AdminDashboardComponent, children: [
      { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
      { path: 'module', loadChildren: () => import('./module/module.module').then(m => m.ModuleModule) },
      { path: 'subModule', loadChildren: () => import('./sub-module/sub-module.module').then(m => m.SubModuleModule) },
      { path: 'technology', loadChildren: () => import('./technology/technology.module').then(m => m.TechnologyModule) },
      { path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
      { path: 'session', loadChildren: () => import('./session/session.module').then(m => m.SessionModule) },
      { path: 'assessment', loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
