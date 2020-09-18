import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardGeototalPage } from './dashboard-geototal.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardGeototalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardGeototalPageRoutingModule {}
