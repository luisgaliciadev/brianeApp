import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardGuiasPageRoutingModule } from './dashboard-guias-routing.module';

import { DashboardGuiasPage } from './dashboard-guias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardGuiasPageRoutingModule
  ],
  declarations: [DashboardGuiasPage]
})
export class DashboardGuiasPageModule {}
