import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardKpimantenimientoPage } from './dashboard-kpimantenimiento.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardKpimantenimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardKpimantenimientoPageRoutingModule {}
