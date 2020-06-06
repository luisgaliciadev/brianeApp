import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/servicios/user.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {

  @Input() title: string;
  @Input() link: string;
  subscribe: any;
  // modoOscuro: boolean;


  constructor(
    public _router: Router,
    public _alertController: AlertController,
    public _menuCtrl: MenuController,
    public _userService: UserService
    // public _dataLocalService: DataLocalService
  ) {
    // this.modoOscuro = this._dataLocalService.modoOscuro;
  } 

  ngOnInit() {}


}
