import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabInicioPageRoutingModule } from './tab-inicio-routing.module';

import { TabInicioPage } from './tab-inicio.page';
import { ComponentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabInicioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabInicioPage]
})
export class TabInicioPageModule {}
