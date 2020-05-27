import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  
  @Input() modoOscuro: boolean;

  menus = [{
    "icon": "person-circle-outline",
    "name": "Mi perfil",
    "redirectTo": ""
},
{
    "icon": "car-outline",
    "name": "Soy Conductor",
    "redirectTo": "/tab-conductor"
},
{
    "icon": "settings-outline",
    "name": "Configuracion",
    "redirectTo": ""
},
{
    "icon": "power-outline",
    "name": "Cerrar Sesión",
    "redirectTo": "/login"
}
];

  constructor(
    public _dataLocalService: DataLocalService,
    private _storage: Storage
  ) { 
  }

  ngOnInit() {
  }

  tema() {    
    this.modoOscuro = !this.modoOscuro;
    this._storage.set('brianeAppTema', this.modoOscuro);
    document.body.classList.toggle('dark');
    this._dataLocalService.modoOscuro = this.modoOscuro;
  }

}
