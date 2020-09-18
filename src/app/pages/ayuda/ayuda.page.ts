import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  title = 'Ayuda';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService
  ) { }

  // ionViewDidEnter() {
  //   console.log('entro en ayuda');
  //   this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
  //     if (this.constructor.name === 'AyudaPage') { 
  //       this._menuCtrl.isOpen('firstMenu').then(
  //         (menuActivo) => {           
  //           if (menuActivo) {
  //             this._menuCtrl.toggle();
  //           } else {
  //             this.presentAlertSalir();
  //           }
  //         }
  //       );         
  //     }
  //   });
  // }

  // ionViewDidLeave() {
  //   console.log('salio de ayuda');
  //   this.subscribe.unsubscribe();
  // }

  ngOnInit() {
  }

  cerrarSesion() {    
    this.presentAlertSalir();
  }  

  async presentAlertSalir() {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      // subHeader: 'Cerrar Sesión',
      message: '¿Desea Cerrar la Sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this._menuCtrl.isOpen('firstMenu').then(
              (menuActivo) => {           
                if (menuActivo) {
                  this._menuCtrl.toggle(); 
                  this._userService.cerrarSesion();
                  this._router.navigate(['/login']); 
                  this.subscribe.unsubscribe();
                } else {
                  this._userService.cerrarSesion();
                  this._router.navigate(['/login']); 
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
