import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class RenewTokenGuard implements CanActivate {

  token: string; 

  constructor(
    public _userService: UserService,    
    public _router: Router
    ) {}

  canActivate(): Promise<boolean> | boolean {
   
    let token = this._userService.token; 
   
    return true;

    if (!token) {
      this._userService.cerrarSesion();
      return false;
    }

    // if (token.length === 0) {
    //   this._userService.cerrarSesion();
    //   return false;
    // }

    let payload = JSON.parse( atob(token.split('.')[1]));
    let expired = this.veryfyTokenVen(payload.exp);
    // console.log('expired: ', expired)
    if (expired) {
      this._userService.cerrarSesion();
      return false;
    }

    return this.veryfyTokenRenew(payload.exp);
    // return true;
  }

  // Verificar fecha de vencimiento de token
  veryfyTokenVen(dateTokenExp: number) {
    // console.log('VERIFICA Token Guard');
   
    let timeNow = new Date().getTime() / 1000;
    // console.log('dateTokenExp: ', dateTokenExp)
    // console.log('timeNow: ', timeNow)
    if (dateTokenExp < timeNow) {
      return true;
    } else {
      return false;
    }
  }

  // Verificar si hay que renivar token
  veryfyTokenRenew(dateTokenExp: number): Promise<boolean> {
    // console.log('veryfyTokenRenew');
    return new Promise((resolve, reject) => {
      
      let tokenExp = new Date( dateTokenExp * 1000);      
      let nowDate = new Date();

      nowDate.setTime(nowDate.getTime() + (1 * 60 * 60 * 1000));

      // console.log ('tokenExp ', tokenExp);
      // console.log('nowDate ', nowDate);

      if ( tokenExp.getTime() > nowDate.getTime() ) {
        resolve(true);
        // console.log('no va a vencer');
      } else {
        this._userService.renewToken().subscribe(
          () => {
            // console.log('token renovado');
            resolve(true);
          }, () => {
            // console.log('token no renovado');
            this._userService.cerrarSesion();
            reject(false);
          }
        );
      }

      //console.log(tokenExp);
      //console.log(nowDate);

      // resolve(true);
    });
  }
  
}
