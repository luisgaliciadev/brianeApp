import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardsComponent } from './dashboards/dashboards.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    DashboardsComponent
  ]
})
export class ComponentsModule { }
