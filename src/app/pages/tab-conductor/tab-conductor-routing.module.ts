import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabConductorPage } from './tab-conductor.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scan'
  },
  {
    path: '',
    component: TabConductorPage,
    children: [
      {
        path: 'scan',
        // loadChildren: '../scan/scan.module#ScanPageModule'
        loadChildren: () =>   import('../scan/scan.module').then(m => m.ScanPageModule)
      },
      {
        path: 'consultas',
        // loadChildren: '../consulta-cond/consulta-cond.module#ConsultaCondPageModule'
        loadChildren: () =>   import('../consulta-cond/consulta-cond.module').then(m => m.ConsultaCondPageModule)
      },
      {
        path: 'ayuda',
        // loadChildren: '../ayuda-cond/ayuda-cond.module#AyudaCondPageModule'
        loadChildren: () =>   import('../ayuda-cond/ayuda-cond.module').then(m => m.AyudaCondPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabConductorPageRoutingModule {}
