import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegPeajePageRoutingModule } from './reg-peaje-routing.module';

import { RegPeajePage } from './reg-peaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegPeajePageRoutingModule
  ],
  declarations: [RegPeajePage]
})
export class RegPeajePageModule {}
