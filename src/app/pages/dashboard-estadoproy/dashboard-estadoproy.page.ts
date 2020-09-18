import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-estadoproy',
  templateUrl: './dashboard-estadoproy.page.html',
  styleUrls: ['./dashboard-estadoproy.page.scss'],
})
export class DashboardEstadoproyPage implements OnInit {

  title = 'Estado de Proyectos';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardEstadoproyPage') {
        this._router.navigate(['/dashboards']);
      // }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
  }

  verDashboard() {
  // console.log(this.noticia.url);
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiMGE0NTI5MjUtMGQ0Ny00YTc2LWI4NTgtNTJlYjU5MDE4ZmYzIiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
    const browser = this._inAppBrowser.create(url, '_system');
  }

}
