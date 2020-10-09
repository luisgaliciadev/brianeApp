import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  loading: any;
  URL: string;
  // conductor;
  // user;
  // loading: any;
  // cargando = false;
  // token;
  // idContentMenu: string;
  // titleDasboard: string;
  // linkDashboard: string;
  // email: string;
  // dni: string;
  // menu = [];

  constructor(
    public _http: HttpClient,
    public _router: Router,
    public _alertController: AlertController,
    public _loadingController: LoadingController,
    private _storage: Storage,
    private _userService: UserService,
    private _navController: NavController,
  ) {    
    this.URL = URL_SERVICES;
    // this.loadStorage();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // OPERACIONES

  // Get verificar guia
  getVerificarNroGuia(correlativo) { 
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this._userService.token});
    let params = correlativo + '/' + this._userService.dni;
    return this._http.get(this.URL + '/operaciones/nroguiacond/' + params, {headers})
    .pipe(map((res: any) => {
      return res;   
    }))
    .pipe(catchError( (err: any) => {   
      if (err.status === 400) {
        const message = err.error.message;
        this.alerta(message);
        return throwError(err);
      } else {
        return throwError(err);
      }
    }));
  }
  // End Get verificar guia

  // OPERACIONES
  /////////////////////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // Conductor
  
  // Get zonas conductor
  getZonaConductor() {
    return this._http.get(this.URL + '/conductor/zonas')
    .pipe(map((res: any) => {
      // console.log(res);
      return res;
    }))
  }
  // End Get zonas conductor

  // Viajes Conductor
  // conductorViajes(DNI: string, DESDE: string, HASTA) {
  //   // console.log('entro a la funcion loginAdmin');    
  //   return this._http.post(this.URL + '/conductor/viajes', {DNI, DESDE, HASTA})
  //     .pipe(map( (res: any) => {          
  //       return res.viajes;            
  //     }))
  //     .pipe(catchError( (err: any) => {
  //       console.log(err);               
  //       this.alerta('Error de Conexion al Servidor.');
  //       return throwError(err);         
  //     }));
  //  }
   conductorViajes(desde, hasta, dni, search, idZona) {
    // console.log('entro a la funcion loginAdmin');    
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this._userService.token});
    let params = desde + '/' + hasta + '/' + dni + '/' + search + '/' + idZona
    return this._http.get(this.URL + '/conductor/viajeshorascomision/' + params, {headers})
      .pipe(map( (res: any) => {          
        return res.viajes;            
      }))
      .pipe(catchError( (err: any) => {
        // console.log(err);               
        this.alerta('Error de Conexion al Servidor.');
        return throwError(err);         
      }));
   }
   // Fin de Viajes Conductor

  // Register Peaje factura
  registePeajeFact(factura) {
    this.loadingLogin(); 
    let json = JSON.stringify(factura);  
    let dataFactura = json;  
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this._userService.token});
    return this._http.post(this.URL + '/conductor/peajefactapp', dataFactura, {headers})
    .pipe(map((res: any) => {
      this.alerta('Factura Registrada Correctamente.'); 
      if (this.loading) {
        this.loading.dismiss();
      }
      return res;
    }))
    .pipe(catchError( (err: any) => {   
      if (err.status === 400) {
        this.alerta(err.error.message); 
        if (this.loading) {
          this.loading.dismiss();
        }
        return throwError(err);
      } else {
        this.alerta('No se pudo realizar el registro.');
        if (this.loading) {
          this.loading.dismiss();
        }
        return throwError(err);
      }
    }));
  }
  // End Register Peaje factura

  // Conductor
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Otros metodos

  // Alerta
  async alerta(mensaje) {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      message: mensaje,
      mode: 'ios',
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
  // Fin alerta

  // Loading Login
  async loadingLogin() {
    this.loading = await this._loadingController.create({
      message: 'Por favor espere...',
    });
    return this.loading.present();
  }
  // Fin Loading Login

  // Get documentos peajes
getDocPeajes() { 
  let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this._userService.token});
  return this._http.get(this.URL + '/conductor/peajes/documentos', {headers})
  .pipe(map((res: any) => {
    return res;   
  }))
  .pipe(catchError( (err: any) => {   
    this._router.navigate(['/peajes']);
    if (err.status === 400) {
      return throwError(err);
    } else {
      // Swal.fire('Mensaje', 'No se pudo consultar la informacion.', 'error');
      return throwError(err);
    }
  }));
}
// End Get documentos peajes

  // Otros metodos
  ///////////////////////////////////////////////////////////////////////////////////////////////////////


}
