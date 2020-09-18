import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { Platform } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login-conductor',
  templateUrl: './login-conductor.page.html',
  styleUrls: ['./login-conductor.page.scss'],
})
export class LoginConductorPage implements OnInit {

  subscribe: any;
  dni: string;
  password = '';
  
  constructor(
    public _router: Router,
    public _userService: UserService,
    public _platform: Platform,
    public _dataLocalService: DataLocalService,
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
      // if (this.constructor.name === 'LoginConductorPage') {
        this.volverInicio();
      // }
    });  
  }

  ionViewDidLeave() {
    this.password = '';
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
  }

  login(datosLogin: NgForm) {
    if (datosLogin.invalid) {
      return;
    }     
    this._userService.loginConductor(datosLogin.value.dni, datosLogin.value.password).subscribe(
      response => {        
        if (response) {
          this._router.navigate(['/tab-conductor/inicio']);
          this.password = '';  
        }
      }
    );    
  }

  volverInicio() {
    this._router.navigate(['/login']);
  }

}
