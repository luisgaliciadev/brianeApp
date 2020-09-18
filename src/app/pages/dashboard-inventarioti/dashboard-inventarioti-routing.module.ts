import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardInventariotiPage } from './dashboard-inventarioti.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardInventariotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardInventariotiPageRoutingModule {}
