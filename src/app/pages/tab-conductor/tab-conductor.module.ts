import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabConductorPageRoutingModule } from './tab-conductor-routing.module';

import { TabConductorPage } from './tab-conductor.page';
import { ComponentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabConductorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabConductorPage]
})
export class TabConductorPageModule {}
