import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegPeajePage } from './reg-peaje.page';

const routes: Routes = [
  {
    path: '',
    component: RegPeajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegPeajePageRoutingModule {}
