import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/servicios/user.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  subscribe: any;
  userImage: string;
  // modoOscuro: boolean;


  constructor(
    public _router: Router,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService
    // public _dataLocalService: DataLocalService
  ) {
    // this.modoOscuro = this._dataLocalService.modoOscuro;
  } 

  ngOnInit() {

    var imagen = this._userService.user.IMAGE;
    if (imagen) {
      this.userImage = 'http://190.117.103.41:3000/api/image/user/' + this._userService.user.IMAGE;
    } else {
      this.userImage = 'http://190.117.103.41:3000/api/image/user/0' ;
    }

  }

  cerrarSesion() {    
    this.presentAlertSalir();
  }  

  async presentAlertSalir() {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      // subHeader: 'Cerrar Sesión',
      message: '¿Desea Cerrar la Sesión?',
      mode: 'ios',
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
            this._menuCtrl.isOpen('firstMenu').then(
              (menuActivo) => {           
                if (menuActivo) {
                  this._menuCtrl.toggle(); 
                  this._userService.cerrarSesion();
                } else {
                  this._userService.cerrarSesion();
                }
              }
            );  
          }
        }
      ]
    });
    await alert.present();
  }

}
