import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UploadFileService } from './upload-file.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string;
  conductor;
  user: User;
  loading: any;
  cargando = false;
  token;
  idContentMenu: string;
  titleDasboard: string;
  linkDashboard: string;
  email: string;
  dni: string;
  menu = [];
  foto = '';

  constructor(
    public _http: HttpClient,
    public _router: Router,
    public _alertController: AlertController,
    public _loadingController: LoadingController,
    private _storage: Storage,
    private _uploadFileService: UploadFileService
  ) {    
    this.loadStorage();
    this.URL = URL_SERVICES;
  }

   //////////////////////////////////////////////////////////////////////////////////////////////////
   // METODO PARA LOGINS

  // Login Normal conductor
  loginConductor(DNI: string, PASSWORD: string) {    
    this.loadingLogin(); 
    return this._http.post(this.URL + '/login/conductor', {DNI, PASSWORD})
      .pipe(map( (res: any) => {        
        if (res.conductor.id > 0) {           
          this.idContentMenu = 'InicioConductor';         
          this.token = res.token;
          this.conductor = res.conductor;
          this._storage.set('BrianeAppToken', this.token);
          this._storage.set('BrianeAppDni', DNI);
          if (this.loading) {
             this.loading.dismiss();
          }
          return true;
        }        
      }))
      .pipe(catchError( (err: any) => {
        if (err.status === 400 || err.status === 404 || err.status === 500) {          
          const message = err.error.message;
          if (this.loading) {
             this.loading.dismiss();
          }
          this.alertLogin(message);
         } else {
          if (this.loading) {
             this.loading.dismiss();
          }         
          this.alertLogin('Error de Conexion al Servidor.');
          return throwError(err);
         }
      }));
   }
   // Fin de Login Normal conductor

  // Login Normal Admin
  loginAdmin(EMAIL: string, PASSWORD: string) {
    this.loadingLogin();     
    return this._http.post(this.URL + '/login', {EMAIL, PASSWORD})
      .pipe(map( (res: any) => {        
        if (res.id > 0) {  
          this.token = res.token;
          this.user = res.user;
          this.menu = res.menu;
          this.dni = this.user.IDEN;
          this._storage.set('BrianeAppToken', this.token);
          this._storage.set('BrianeAppEmail', EMAIL);
          this._storage.set('BrianeAppMenu', this.menu);
          this._storage.set('BrianeAppDni', this.user.IDEN);
          if (this.user.ID_ROLE == 14) {
            this.idContentMenu = 'InicioConductor'; 
          } else {
            this.idContentMenu = 'inicioAdmin'; 
          }
          if (this.loading) {
             this.loading.dismiss();
          }
          return this.user;
        }        
      }))
      .pipe(catchError( (err: any) => {
        // console.log(err);
        if (err.status === 400 || err.status === 404 || err.status === 500) {
          if (this.loading) {
             this.loading.dismiss();
          }
          const message = err.error.message;
          this.alertLogin(message);
         } else {
          if (this.loading) {
             this.loading.dismiss();
          }         
          this.alertLogin('Error de Conexion al Servidor.');
          return throwError(err);
         }
      }));
   }
   // Fin de Login Normal Admin

  // FIN METODO PARA LOGINS
  //////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CERRAR SESION
  cerrarSesion() {
    this.token = '';
    this.conductor = '';
    this._storage.remove('BrianeAppToken');
    this._router.navigate(['/login']);   
  }
  //FIN CERRAR SESION
  /////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // METODOS PARA USUARIO

  // Actualizar perfil de usuario
  updateProfile(user: User) {
    this.loadingLogin();
    let json = JSON.stringify(user);
    let params = json;
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.put(this.URL + '/user/' + user.ID_USER, params, {headers})
    .pipe(map((res: any) => {
      // console.log(res);
      this.user = res.user;
      if (this.loading) {
        this.loading.dismiss();
      }  
      this.alertLogin('Datos actualizados correctamente.');
      return true;
    }))
    .pipe(catchError( (err: any) => {
      // console.log(err.error.message);
      if (err.status === 400) {
        if (this.loading) {
          this.loading.dismiss();
        }  
        this.alertLogin('No se pudo actualizar la información.');
        return throwError(err);
      } else {
        if (this.loading) {
          this.loading.dismiss();
        }  
        this.alertLogin('Error en la petición.');
        return throwError(err);
      }
    }));
   }
   // Fin Actualizar perfil de usuario

   // Cambiar imagen de perfil de usuario
  changeImage(file: File, id: number) {
    this.loadingLogin();
    return this._uploadFileService.uploadFile(file, 'user', id, this.user.ID_USER)
        .then( (resp: any) => {            
          this.user.IMAGE = resp.user.IMAGE;
          if (this.loading) {
             this.loading.dismiss();
          }  
          this.alertLogin('Imagen actualizada correctamente.');
          return true; 
        })
        .catch( resp => {
          if (this.loading) {
             this.loading.dismiss();
          } 
          // console.log('error resp changeImage:', resp);
          this.alertLogin('No se pudo cargar la imagen.');
          return false; 
        });
   }
   // Fin Cambiar imagen de perfil de usuario

   // Cargar storage
  async loadStorage() {    
    const token = await this._storage.get('BrianeAppToken');
    this.token = token;

    const dni = await this._storage.get('BrianeAppDni');
    this.dni = dni;

    const email = await this._storage.get('BrianeAppEmail');
    this.email = email;
       
  }
  // Fin de cargar storage
  
  // Renovar token
  renewToken() {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    return this._http.get(this.URL + '/login/renewtoken', {headers})
              .pipe(map( (res: any) => {
                 this.token = res.token;
                 this._storage.set('BrianeAppToken', this.token);
                //  console.log('Token renew');
                 return true;
               }))
               .pipe(catchError( (err: any) => {                
                 return throwError(err);
               }));
  }
  // Fin de Renovar token

  // Foto personal
  getFotoPersonal(dni) {
    return this._http.get(this.URL + '/login/fotopersonalapp/' + dni)
    .pipe(map((res: any) => {
      this.foto = res.foto;
      return res;
    }))
  }
  //

  // METODOS PARA USUARIO
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////OTROS METODOS


// Alerta Login
  async alertLogin(mensaje) {
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
  // Fin alerta login

  // Loading Login
  async loadingLogin() {
    this.loading = await this._loadingController.create({
      message: 'Por favor espere...',
    });
    return this.loading.present();
  }
  // Fin Loading Login

  ///////OTROS METODOS
  //////////////////////////////////////////////////////////////////////////////////////////////////

}
