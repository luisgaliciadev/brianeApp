import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabConductorPage } from './tab-conductor.page';
import { RenewTokenGuard } from 'src/app/servicios/guards/renew-token.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio'
  },
  {
    path: '',
    component: TabConductorPage,
    children: [
      {
        path: 'inicio',
        canActivate: [RenewTokenGuard],
        // loadChildren: '../inicio/inicio.module#InicioPageModule'
        loadChildren: () =>   import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'scan',
        canActivate: [RenewTokenGuard],
        // loadChildren: '../scan/scan.module#ScanPageModule'
        loadChildren: () =>   import('../scan/scan.module').then(m => m.ScanPageModule)
      },
      {
        path: 'consultas',
        canActivate: [RenewTokenGuard],
        // loadChildren: '../consulta-cond/consulta-cond.module#ConsultaCondPageModule'
        loadChildren: () =>   import('../consulta-cond/consulta-cond.module').then(m => m.ConsultaCondPageModule)
      },
      {
        path: 'ayuda',
        canActivate: [RenewTokenGuard],
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
