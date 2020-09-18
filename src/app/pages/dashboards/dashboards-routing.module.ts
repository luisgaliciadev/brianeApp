import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardsPage } from './dashboards.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsPageRoutingModule {}
