import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/servicios/service.index';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  subscribe: any;
  page: string;
  email: string;
  password='';

  constructor(
    public _userService: UserService,
    public _router: Router,
    public _platform: Platform,
    public _dataLocalService: DataLocalService,
    public _alertController: AlertController,
    public _storage: Storage    
  ) { 

    // this._dataLocalService.verificarTema();
    // this._userService.loadStorage();

    // console.log('email service:', this._userService.email);

    this._storage.get('BrianeAppEmail').then(
      email => {
        this.email = email;
      }
    );
  }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'LoginPage') {
        this.presentAlertSalir();
      // }
    });    
  }

  ionViewDidLeave() {
    this.password='';
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
    this.email = this._userService.email;
  }

  login(datosLogin: NgForm) {
    if (datosLogin.invalid) {
      return;
    }     
    this._userService.loginAdmin(datosLogin.value.email, datosLogin.value.password).subscribe(
      async response => {        
        if (response) {
          if (response.ID_ROLE == 14) {
            this._router.navigate(['/tab-conductor/inicio']);
          } else {
            this._router.navigate(['/tab-inicio/inicio']);
          }
          this.password = '';  
        }
      }
    );    
  }

  loginConductor() {
    this._router.navigate(['/login-conductor']);
  }   

  async presentAlertSalir() {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      mode: 'ios',
      message: '¿Desea Cerrar la Aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'botonAlert',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          cssClass: 'botonAlert',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }

}
