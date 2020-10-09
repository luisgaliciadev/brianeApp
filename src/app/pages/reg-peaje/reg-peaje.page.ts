import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { RegisterService, UserService } from 'src/app/servicios/service.index';
// import { Params, Router } from '@angular/router';
// import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reg-peaje',
  templateUrl: './reg-peaje.page.html',
  styleUrls: ['./reg-peaje.page.scss'],
})
export class RegPeajePage implements OnInit {

  title = 'Registro de Factura Peaje';
  data = '';
  nroComprobante = '';
  // desde: string = new Date().toISOString();
  fechaComprobante = '';
  montoComprobante = '';
  nroGuia = '';
  nroOrden = '';
  ruta = '';
  subscribe: any;
  idGuia = 0;
  documentosPeaje = [];
  idTipoDoc = 0;

  constructor(
    // private _navParamas: NavParams
    private _activeRoute: ActivatedRoute,
    public _platform: Platform,
    private _navController: NavController,
    private _registerService: RegisterService,
    private _userService: UserService
  ) { }

   
  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'PerfilPage') {
        this._navController.pop();
      // }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
    // console.log(this.fechaComprobante);
    if (this._activeRoute.snapshot.paramMap.get('data')) {
      // console.log('ingreso a parametros');
      this.data = this._activeRoute.snapshot.paramMap.get('data');
      // console.log('this.data:', this.data);
      if (this.data != '0') {
        var arrayBarcodeData = this.data.split('|');
        var serialDoc = arrayBarcodeData[0];
        var nroDoc = arrayBarcodeData[1];
        var igv = arrayBarcodeData[2];
        var total = arrayBarcodeData[3];
        var fechaEmision = arrayBarcodeData[4];
        this.nroComprobante = serialDoc + '-' + nroDoc;
        this.fechaComprobante = fechaEmision;
        this.montoComprobante = total;
        this.idTipoDoc = 1;
      } {
        this.getDocPeajes();
      }   
    } 
  }

  validarGuia() {
    if (this.nroGuia === '') {
      return;
    }
    this._registerService.getVerificarNroGuia(this.nroGuia).subscribe(
      (response: any) => {
        // console.log(response);
        this.idGuia = response.guia.ID_GUIA;
      }
    );
  }

  getDocPeajes () {
    this._registerService.getDocPeajes().subscribe(
      (response: any) => { 
        // console.log(response);      
        this.documentosPeaje = response.documentosPeaje;
        // console.log(this.documentosPeaje);
      }
    );
  }

  guardar(datos: NgForm) {
    if (this.idGuia == 0 && this.idTipoDoc == 1) {
      this._registerService.alerta('Debe ingresar un numero de guia valido.');
      return;
    }
    var fecha = this.fechaComprobante.substring(0, 10);
    let factura = {
      idPeaje: 0,
      idDetallePeaje: 0,
      numero: this.nroComprobante,
      monto: this.montoComprobante,
      fecha: fecha,
      idGuia: this.idGuia,
      idUser : this._userService.user.ID_USER,
      idTipoDoc: this.idTipoDoc,
      dni: this._userService.dni
    }

    this._registerService.registePeajeFact(factura).subscribe(
      (response: any) => {
        // console.log(response);
        this.nroComprobante = '';
        this.fechaComprobante = '';
        this.montoComprobante = '';
        this.nroGuia = '';
        this.idGuia = 0;
        // this._navController.navigateForward('/scan');
        this._navController.pop();
      }
    );

    // console.log(datos);
  }

}
