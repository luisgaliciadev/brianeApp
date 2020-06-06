import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardGuiasPage } from './dashboard-guias.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardGuiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardGuiasPageRoutingModule {}
