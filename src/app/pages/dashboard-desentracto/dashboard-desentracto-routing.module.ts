import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDesentractoPage } from './dashboard-desentracto.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDesentractoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDesentractoPageRoutingModule {}
