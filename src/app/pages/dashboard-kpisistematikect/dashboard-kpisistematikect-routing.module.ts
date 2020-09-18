import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardKpisistematikectPage } from './dashboard-kpisistematikect.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardKpisistematikectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardKpisistematikectPageRoutingModule {}
