import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardGeototalPageRoutingModule } from './dashboard-geototal-routing.module';

import { DashboardGeototalPage } from './dashboard-geototal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardGeototalPageRoutingModule
  ],
  declarations: [DashboardGeototalPage]
})
export class DashboardGeototalPageModule {}
