import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda-cond',
  templateUrl: './ayuda-cond.page.html',
  styleUrls: ['./ayuda-cond.page.scss'],
})
export class AyudaCondPage implements OnInit {

  title = 'Ayuda';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router,
    public _alertController: AlertController
  ) { }

  // ionViewDidEnter() {
  //   this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
  //     if (this.constructor.name === 'AyudaCondPage') { 
  //       this.presentAlertSalir();      
  //     }
  //   });
  // }

  // ionViewDidLeave() {
  //   this.subscribe.unsubscribe();
  // }

  ngOnInit() {
  }

  async presentAlertSalir() {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      // subHeader: 'Cerrar Sesión',
      message: '¿Desea Cerra la Sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            // console.log('Confirm Okay');
            this.subscribe.unsubscribe();
            this._router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

}
