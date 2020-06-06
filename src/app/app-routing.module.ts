import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RenewTokenGuard } from './servicios/guards/renew-token.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab-inicio',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/tab-inicio/tab-inicio.module').then( m => m.TabInicioPageModule)
  },
  {
    path: 'inicio',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'ayuda',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'consultas',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'scan',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'tab-conductor',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/tab-conductor/tab-conductor.module').then( m => m.TabConductorPageModule)
  },
  {
    path: 'ayuda-cond',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/ayuda-cond/ayuda-cond.module').then( m => m.AyudaCondPageModule)
  },
  {
    path: 'consulta-cond',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/consulta-cond/consulta-cond.module').then( m => m.ConsultaCondPageModule)
  },
  {
    path: 'login-conductor',
    loadChildren: () => import('./pages/login-conductor/login-conductor.module').then( m => m.LoginConductorPageModule)
  },
  {
    path: 'viajes-conductor',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/viajes-conductor/viajes-conductor.module').then( m => m.ViajesConductorPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboard-os',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/dashboard-os/dashboard-os.module').then( m => m.DashboardOsPageModule)
  },
  {
    path: 'dashboard-guias',
    canActivate: [RenewTokenGuard],
    loadChildren: () => import('./pages/dashboard-guias/dashboard-guias.module').then( m => m.DashboardGuiasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
