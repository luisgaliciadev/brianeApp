import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardKpisistematikectPageRoutingModule } from './dashboard-kpisistematikect-routing.module';

import { DashboardKpisistematikectPage } from './dashboard-kpisistematikect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardKpisistematikectPageRoutingModule
  ],
  declarations: [DashboardKpisistematikectPage]
})
export class DashboardKpisistematikectPageModule {}
