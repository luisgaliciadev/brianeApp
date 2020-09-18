import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaCondPageRoutingModule } from './consulta-cond-routing.module';

import { ConsultaCondPage } from './consulta-cond.page';
import { ComponentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaCondPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConsultaCondPage]
})
export class ConsultaCondPageModule {}
