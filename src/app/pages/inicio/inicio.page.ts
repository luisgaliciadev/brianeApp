import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  title = 'Inicio';
  subscribe: any;
  modoOscuro: boolean;

  constructor(
    public _router: Router,
    public _platform: Platform,
    public _dataLocalService: DataLocalService
  ) { 
    this.modoOscuro = this._dataLocalService.modoOscuro;
    console.log('modo oscuro:', this.modoOscuro);
  }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'InicioPage') {
        if (window.confirm('¿Desea Cerrar la Sesión? ')) {
          this.subscribe.unsubscribe();
          this._router.navigate(['/login']);
        }
      }
    });
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
  }

  salir() {
    if (window.confirm('¿Desea Cerrar la Sesión?')) {
      this._router.navigate(['/login']);
    }
  }

}
