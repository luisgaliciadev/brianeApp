import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaCondPage } from './consulta-cond.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaCondPageRoutingModule {}
