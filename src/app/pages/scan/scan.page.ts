import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';
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
  }


  constructor(
    private _barcodeScanner: BarcodeScanner,
    private _navController: NavController
    // private qrScanner: QRScanner
    // public _platform: Platform,
    // private _router: Router
  ) { }

  // ionViewDidEnter() {
  //   this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
  //     if (this.constructor.name === 'ScanPage') {
  //       this.subscribe.unsubscribe();
  //       this._router.navigate(['/tab-inicio']);
  //     }
  //   });
  // }

  // ionViewDidLeave() {
  //   this.subscribe.unsubscribe();
  // }
  

  ngOnInit() {
  }

  scan() {
    this._barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this._navController.navigateForward('/reg-peaje/' + barcodeData.text);
      if (!barcodeData.cancelled) {
        
      }
      }).catch(err => {
        console.log('Error', err);
        var barcodeData = ('20505377142|01|F154|767605|7.41|48.60|2020-08-28|6|20516185211|ObnlnH7aLOyYMCJlMK1EbfDySOU=');
        this._navController.navigateForward('/reg-peaje/' + barcodeData);
      });
  }    
}