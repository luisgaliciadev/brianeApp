import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardIndexpersonalPageRoutingModule } from './dashboard-indexpersonal-routing.module';

import { DashboardIndexpersonalPage } from './dashboard-indexpersonal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardIndexpersonalPageRoutingModule
  ],
  declarations: [DashboardIndexpersonalPage]
})
export class DashboardIndexpersonalPageModule {}
