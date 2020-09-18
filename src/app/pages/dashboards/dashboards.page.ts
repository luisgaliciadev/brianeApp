import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
})
export class DashboardsPage implements OnInit {

  title = 'Consulta de Dahsboards';
  subscribe: any;

  opciones =  [  
    {
      "icon": "stats-chart-outline",
      "name": "Ordenes de Servicio",
      "redirectTo": "/dashboard-os",
      "link": "https://app.powerbi.com/view?r=eyJrIjoiZWVhMTllNDUtZjY3My00N2NhLWEzM2YtZTk0MmYxN2RhMTQ4IiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9",
    },
    {
      "icon": "stats-chart-outline",
      "name": "KPI Operaciones",
      "redirectTo": "/dashboard-guias",
      "link": "https://app.powerbi.com/view?r=eyJrIjoiZWVhMTllNDUtZjY3My00N2NhLWEzM2YtZTk0MmYxN2RhMTQ4IiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9",
    }
    ];

  constructor(
    public _platform: Platform,
    public _router: Router,
    public _userService: UserService,
    private _navController: NavController
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardsPage') {
        this._navController.pop();
      // }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
    var dashboards = this._userService.menu;
    // console.log(dashboards);
    const menu = dashboards.filter(dashboards => dashboards.ID_MODULE_MAIN == 1 && dashboards.FG_POWERBI == 1);

    if (menu) {
      this.opciones = menu
      // console.log(this.opciones);
    } else {
      this.opciones = [];
    }
  }

}
