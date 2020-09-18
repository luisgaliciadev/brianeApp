import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardKpimantenimientoPageRoutingModule } from './dashboard-kpimantenimiento-routing.module';

import { DashboardKpimantenimientoPage } from './dashboard-kpimantenimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardKpimantenimientoPageRoutingModule
  ],
  declarations: [DashboardKpimantenimientoPage]
})
export class DashboardKpimantenimientoPageModule {}
