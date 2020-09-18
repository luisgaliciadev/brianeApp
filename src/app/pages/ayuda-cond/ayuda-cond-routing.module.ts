import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudaCondPage } from './ayuda-cond.page';

const routes: Routes = [
  {
    path: '',
    component: AyudaCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudaCondPageRoutingModule {}
