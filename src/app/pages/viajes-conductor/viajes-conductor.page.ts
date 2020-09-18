import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-viajes-conductor',
  templateUrl: './viajes-conductor.page.html',
  styleUrls: ['./viajes-conductor.page.scss'],
})
export class ViajesConductorPage implements OnInit {
  
  title = 'Control de Viajes';
  desde: string = new Date().toISOString();
  hasta: string = new Date().toISOString();
  viajes = [];
  loading: any;
  totalViajes = 0;
  totalImporte = 0;
  importeTotal = '0.00';
  subscribe: any;
  dni = '';

  constructor(
    public _userService: UserService,
    public _loadingController: LoadingController,
    public _alertController: AlertController,
    public _platform: Platform,
    public _router: Router,
    public _storage: Storage    
  ) { 
    this._storage.get('BrianeAppDni').then(
      dni => {
        this.dni = dni;
      }
    );    
  }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'ViajesConductorPage') {
        this._router.navigate(['/tab-conductor/consultas']);
      // }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() { 
    console.log(this.desde);
  } 

  buscar() {
    this.loadingLogin();
    this.totalViajes = 0;
    this.totalImporte = 0;
    this.importeTotal = '0.00'; 
    const desde = this.desde.substring(0, 10);
    const hasta = this.hasta.substring(0, 10);
    // console.log('dni: ', dni);
    // console.log('desde: ', desde);
    // console.log('hasta: ', hasta);

    this._userService.conductorViajes(this.dni,desde,hasta).subscribe(
      viajes => {
        // console.log(viajes);
        this.viajes = viajes;
        this.totalViajes = viajes.length;

        let i;
        for (i = 0; i < viajes.length; i++) {          
          this.totalImporte += viajes[i].ComisionImporte; 
          // console.log('i: ', i, this.totalImporte)
        }           
        //this.importeTotal = parseInt(this.importeTotal).toFixed(2);
        this.importeTotal = this.formatoNumero(this.totalImporte,2,'.',',');
        // console.log(this.formatoNumero(this.totalImporte,2,'.',','));
        this.loading.dismiss();
      }
    );
  }

  formatoNumero(numero, decimales, separadorDecimal, separadorMiles) {
    var partes, array;

    if ( !isFinite(numero) || isNaN(numero = parseFloat(numero)) ) {
        return "";
    }
    if (typeof separadorDecimal==="undefined") {
        separadorDecimal = ",";
    }
    if (typeof separadorMiles==="undefined") {
        separadorMiles = "";
    }

    // Redondeamos
    if ( !isNaN(parseInt(decimales)) ) {
        if (decimales >= 0) {
            numero = numero.toFixed(decimales);
        } else {
            numero = (
                Math.round(numero / Math.pow(10, Math.abs(decimales))) * Math.pow(10, Math.abs(decimales))
            ).toFixed();
        }
    } else {
        numero = numero.toString();
    }

    // Damos formato
    partes = numero.split(".", 2);
    array = partes[0].split("");
    for (var i=array.length-3; i>0 && array[i-1]!=="-"; i-=3) {
        array.splice(i, 0, separadorMiles);
    }
    numero = array.join("");

    if (partes.length>1) {
        numero += separadorDecimal + partes[1];
    }

    return numero;
}

  // Alerta busacr
  async alertLogin(mensaje) {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      mode: 'ios',
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'botonAlert',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
  // Fin alerta login

  // Loading buscar
  async loadingLogin() {
    this.loading = await this._loadingController.create({
      message: 'Consultado, por favor espere...',
    });
    return this.loading.present();
  }
  // Fin Loading Login

}
