import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardsPageRoutingModule } from './dashboards-routing.module';

import { DashboardsPage } from './dashboards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardsPageRoutingModule
  ],
  declarations: [DashboardsPage]
})
export class DashboardsPageModule {}
