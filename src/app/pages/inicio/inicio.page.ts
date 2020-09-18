import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { UserService } from 'src/app/servicios/service.index';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  title = 'Inicio';
  subscribe: any;
  modoOscuro: boolean;
  userImage = '';

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/images/mision.jpg',
      titulo: 'Misión',
      desc: 'Brindamos al cliente soluciones logísticas para su negocio a través de un excelente servicio de transporte terrestre de carga en general.'
    },
    {
      img: '/assets/images/valores.jpg',
      titulo: 'Visión',
      desc: 'Ser reconocida por el cliente como su principal socio estratégico para el transporte de carga.'
    },
    {
      img: '/assets/images/valores.jpg',
      titulo: 'Valores',
      desc: 'Trabajo en equipo, liderazgo, pasión, integridad y seguridad.'
    }
  ];

  constructor(
    public _router: Router,
    public _platform: Platform,
    public _dataLocalService: DataLocalService,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService
  ) { 
    this.modoOscuro = this._dataLocalService.modoOscuro;
    this.userImage = this._userService.user.IMAGE;
  }

  ionViewDidEnter() {    
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      console.log('presente0');
      console.log(this.constructor.name);   
      // if (this.constructor.name === 'InicioPage') {        
        this._menuCtrl.isOpen('firstMenu').then(
          (menuActivo) => {           
            if (menuActivo) {
              this._menuCtrl.toggle();              
            } else {   
              console.log('presente1');                       
              this.presentAlertSalir();
              console.log('presente3');
            }
          }
        );
      // }
    });
  }

  ngOnInit() {
  }

  cerrarSesion() {    
    this.presentAlertSalir();
  }  

  async presentAlertSalir() {
    console.log('presente2');
    const alert = await this._alertController.create({
      header: 'Mensaje',      
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
                  this.subscribe.unsubscribe();
                } else {
                  this._userService.cerrarSesion(); 
                  this.subscribe.unsubscribe();
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
