import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardIndexpersonalPage } from './dashboard-indexpersonal.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardIndexpersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardIndexpersonalPageRoutingModule {}
