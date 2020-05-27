import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  subscribe: any;
  page: string;


  constructor(
    public _router: Router,
    public _platform: Platform,
    public _dataLocalService: DataLocalService,
  ) { 
    this._dataLocalService.verificarTema();
  }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      if (this.constructor.name === 'LoginPage') {
        if (window.confirm('¿Desea Cerrar la Aplicación? ')) {
          navigator['app'].exitApp();
        }
      }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
  }

  
  onclick() {
    this._router.navigate(['/tab-inicio/inicio']);
  }

}
