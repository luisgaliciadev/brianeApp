import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { Params, Router } from '@angular/router';
// import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reg-peaje',
  templateUrl: './reg-peaje.page.html',
  styleUrls: ['./reg-peaje.page.scss'],
})
export class RegPeajePage implements OnInit {

  title = 'Registro de Peaje';
  data = '';
  nroComprobante = '';
  fechaComprobante = '';
  montoComprobante = '';
  nroGuia = '';
  nroOrden = '';
  ruta = '';

  constructor(
    // private _navParamas: NavParams
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this._activeRoute.snapshot.paramMap.get('data')) {
      this.data = this._activeRoute.snapshot.paramMap.get('data');
      console.log('data', this.data);
      var arrayBarcodeData = this.data.split('|');
      // var rucProveedor = arrayBarcodeData[0];
      // var tipoDoc = arrayBarcodeData[1];
      var serialDoc = arrayBarcodeData[2];
      var nroDoc = arrayBarcodeData[3];
      // var igv = arrayBarcodeData[4];
      var total = arrayBarcodeData[5];
      var fechaEmision = arrayBarcodeData[6];
      // var rucEmpresa = arrayBarcodeData[7];
      // var hash = arrayBarcodeData[8];

      this.nroComprobante = serialDoc + '-' + nroDoc;
      this.fechaComprobante = fechaEmision;
      this.montoComprobante = total;

      console.log(arrayBarcodeData);
    } 
  }

  guardar(datos: NgForm) {
    console.log(datos);
  }

}
