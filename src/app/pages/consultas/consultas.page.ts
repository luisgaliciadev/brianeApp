import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/servicios/user.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  
  title = 'Consultas';
  subscribe: any;
  modoOscuro: boolean;  

  opciones = [  
    {
      "icon": "stats-chart-outline",
      "name": "Dashboard",
      "redirectTo": "/dashboards",
    }
    ];

  // opciones = [
  //   {
  //     "icon": "documents-outline",
  //     "name": "Dashboard Ordenes Servicios",
  //     "redirectTo": "/dashboard-os",
  //     "link": "https://app.powerbi.com/view?r=eyJrIjoiMjk0MTBlZGYtNjIxZi00ZWVkLWFhNDgtNDZiYTNhYjU4NDUzIiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9",
  //   },
  //   {
  //     "icon": "stats-chart-outline",
  //     "name": "Dashboard KPI Operaciones",
  //     "redirectTo": "/dashboard-guias",
  //     "link": "https://app.powerbi.com/view?r=eyJrIjoiZWVhMTllNDUtZjY3My00N2NhLWEzM2YtZTk0MmYxN2RhMTQ4IiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9",
  //   }
  //   ];

  constructor(
    public _platform: Platform,
    private _router: Router,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService,
    public _dataLocalService: DataLocalService
  ) { 
    this.modoOscuro = this._dataLocalService.modoOscuro;
  }

  ngOnInit() {
  }

  cerrarSesion() {    
    this.presentAlertSalir();
  }  

  async presentAlertSalir() {
    const alert = await this._alertController.create({
      header: 'Mensaje',
      // subHeader: 'Cerrar Sesión',
      message: '¿Desea Cerrar la Sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {   
            this._menuCtrl.isOpen('firstMenu').then(
              (menuActivo) => {           
                if (menuActivo) {
                  this._menuCtrl.toggle(); 
                  this._userService.cerrarSesion();
                  this._router.navigate(['/login']); 
                  this.subscribe.unsubscribe();
                } else {
                  this._userService.cerrarSesion();
                  this._router.navigate(['/login']); 
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

  dataDashboard(title: string, link: string){
    // this._userService.titleDasboard = title;
    // this._userService.linkDashboard = link;
    // // console.log('this._userService: ',this._userService.titleDasboard);
    // // console.log('this._userService: ',this._userService.linkDashboard);
    // this._router.navigate(['/dashboard']); 
  }

}
