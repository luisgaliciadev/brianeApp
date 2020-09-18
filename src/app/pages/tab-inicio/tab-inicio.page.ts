import { Component, OnInit } from '@angular/core';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { UserService } from 'src/app/servicios/user.service';
import { Storage } from '@ionic/storage';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab-inicio',
  templateUrl: './tab-inicio.page.html',
  styleUrls: ['./tab-inicio.page.scss'],
})
export class TabInicioPage implements OnInit {

  modoOscuro: boolean;
  idContent: string;
  menus = [
    {
      "icon": "home-outline",
      "name": "Inicio",
      "redirectTo": "/tab-inicio"
    },
    {
      "icon": "person-circle-outline",
      "name": "Mi perfil",
      "redirectTo": "/perfil"
    },
    {
      "icon": "search-circle-outline",
      "name": "Consultas",
      "redirectTo": "/tab-inicio/consultas"
    },
    {
      "icon": "stats-chart-outline",
      "name": "Dashboards",
      "redirectTo": "/dashboards"
    }
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
    // this.idContent = 'inicioAdmin';
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
    console.log('HOLA'); 
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
