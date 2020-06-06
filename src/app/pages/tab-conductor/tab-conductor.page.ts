import { Component, OnInit } from '@angular/core';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { UserService } from 'src/app/servicios/user.service';
import { Storage } from '@ionic/storage';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-conductor',
  templateUrl: './tab-conductor.page.html',
  styleUrls: ['./tab-conductor.page.scss'],
})
export class TabConductorPage implements OnInit {

  modoOscuro: boolean;
  idContent: string;
  menus = [
    // {
    //   "icon": "person-circle-outline",
    //   "name": "Mi perfil",
    //   "redirectTo": ""
    // },
    // {
    //   "icon": "settings-outline",
    //   "name": "Configuracion",
    //   "redirectTo": ""
    // }
  ];

  constructor(
    public _dataLocalService: DataLocalService,
    public _dataUserService: UserService,
    private _storage: Storage,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService
  ) { 
    this.modoOscuro = this._dataLocalService.modoOscuro;
    this.idContent = this._dataUserService.idContentMenu;
    this.idContent = 'InicioConductor';
    // console.log('this.idContent: ',this.idContent);
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
      mode: 'ios',
      // subHeader: 'Cerrar Sesión',
      message: '¿Desea Cerrar la Sesión?',
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
