import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicioPage } from './tab-inicio.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio'
  },
  {
    path: '',
    component: TabInicioPage,
    children: [
      {
        path: 'inicio',
        // loadChildren: '../inicio/inicio.module#InicioPageModule'
        loadChildren: () =>   import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'consultas',
        // loadChildren: '../consultas/consultas.module#ConsultasPageModule'
        loadChildren: () =>   import('../consultas/consultas.module').then(m => m.ConsultasPageModule)
      },
      {
        path: 'ayuda',
        // loadChildren: '../ayuda/ayuda.module#AyudaPageModule'
        loadChildren: () =>   import('../ayuda/ayuda.module').then(m => m.AyudaPageModule)
   
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicioPageRoutingModule {}
