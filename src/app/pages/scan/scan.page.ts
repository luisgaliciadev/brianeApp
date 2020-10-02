import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, MenuController, NavController, Platform } from '@ionic/angular';
import { UserService } from 'src/app/servicios/service.index';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
// import { Router } from '@angular/router';
// import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  title = 'Escáner QR';
  subscribe: any;
  modoOscuro: boolean = false;
  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  scan = false;
  
  constructor(
    private _barcodeScanner: BarcodeScanner,
    private _navController: NavController,
    // private qrScanner: QRScanner
    public _router: Router,
    public _platform: Platform,
    // public _dataLocalService: DataLocalService,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService
  ) { }

  ionViewDidEnter() {   
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {   
      this._menuCtrl.isOpen('firstMenu').then(
        (menuActivo) => {           
          if (menuActivo) {
            this._menuCtrl.toggle();              
          } else {   
            if (!this.scan) {
              this.presentAlertSalir();
            } else {
              this.scan = false;
            }
          }
        }
      );
    });
  }

  // ionViewDidLeave() {
  //   this.subscribe.unsubscribe();
  // }
  

  ngOnInit() {
  }

  scanQR() {
    this.scan = true;
    this._barcodeScanner.scan().then(barcodeData => {      
    if (!barcodeData.cancelled) {    
      let arrayData = barcodeData.text.split('|');   
      let dataFactura = `${arrayData[2]}|${arrayData[3]}|${arrayData[4]}|${arrayData[5]}|${arrayData[6]}`;   
      this._navController.navigateForward('/reg-peaje/' + dataFactura);     
    } 
    }).catch(err => {
      console.log('Error', err);
      // var barcodeData = ('20505377142|01|F154|767605|7.41|48.60|2020-08-28|6|20516185211|ObnlnH7aLOyYMCJlMK1EbfDySOU=');
      // let arrayData = barcodeData.split('|'); 
      // let dataFactura = `${arrayData[2]}|${arrayData[3]}|${arrayData[4]}|${arrayData[5]}|${arrayData[6]}`;
      // this._navController.navigateForward('/reg-peaje/' + dataFactura);
    });
  }  

  registroManual() {
    this._navController.navigateForward('/reg-peaje/0');
  }

  cerrarSesion() {    
    this.presentAlertSalir();
  }  

  async presentAlertSalir() {
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