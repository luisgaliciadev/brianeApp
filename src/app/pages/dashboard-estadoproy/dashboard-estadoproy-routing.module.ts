import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardEstadoproyPage } from './dashboard-estadoproy.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardEstadoproyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardEstadoproyPageRoutingModule {}
