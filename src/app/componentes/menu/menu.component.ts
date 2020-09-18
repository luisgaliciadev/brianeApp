import { Component, OnInit, Input } from '@angular/core';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/servicios/user.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  @Input() modoOscuro: boolean;
  @Input() idContent: string;
  subscribe: any;  

  menus = [
  {
    "icon": "person-circle-outline",
    "name": "Mi perfil",
    "redirectTo": ""
  },
  {
    "icon": "settings-outline",
    "name": "Dashboard",
    "redirectTo": ""
  }
  ];

  constructor(
    public _router: Router,
    public _dataLocalService: DataLocalService,
    private _storage: Storage,
    public _userService: UserService,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
  ) {
  }

  ngOnInit() {
  }

  tema() {    
    this.modoOscuro = !this.modoOscuro;
    this._storage.set('brianeAppTema', this.modoOscuro);
    document.body.classList.toggle('dark');
    this._dataLocalService.modoOscuro = this.modoOscuro;
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
