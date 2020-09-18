import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  title = 'Mi Perfil';
  subscribe: any;
  userImage = '';
  nombre = '';
  email = '';
  telefono = '';
  user: any;
  constructor(
    public _platform: Platform,
    public _router: Router,
    public _userService: UserService,
    private _navController: NavController
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
    this.user = this._userService.user;
    this.nombre = this.user.NAME;
    this.email = this.user.EMAIL;
    this.telefono = this.user.PHONE;
    var imagen = this._userService.user.IMAGE;
    if (imagen) {
      this.userImage = 'http://190.117.103.41:3000/api/image/user/' + this._userService.user.IMAGE;
    } else {
      this.userImage = 'http://190.117.103.41:3000/api/image/user/0' ;
    }
  }

}
