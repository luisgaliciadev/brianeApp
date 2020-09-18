import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardEstadoproyPageRoutingModule } from './dashboard-estadoproy-routing.module';

import { DashboardEstadoproyPage } from './dashboard-estadoproy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardEstadoproyPageRoutingModule
  ],
  declarations: [DashboardEstadoproyPage]
})
export class DashboardEstadoproyPageModule {}
