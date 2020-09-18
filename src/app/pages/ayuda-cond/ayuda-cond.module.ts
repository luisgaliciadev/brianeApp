import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudaCondPageRoutingModule } from './ayuda-cond-routing.module';

import { AyudaCondPage } from './ayuda-cond.page';
import { ComponentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudaCondPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AyudaCondPage]
})
export class AyudaCondPageModule {}
