import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesConductorPageRoutingModule } from './viajes-conductor-routing.module';

import { ViajesConductorPage } from './viajes-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesConductorPageRoutingModule
  ],
  declarations: [ViajesConductorPage]
})
export class ViajesConductorPageModule {}
