import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-geototal',
  templateUrl: './dashboard-geototal.page.html',
  styleUrls: ['./dashboard-geototal.page.scss'],
})
export class DashboardGeototalPage implements OnInit {

  title = 'Geotab - Valores Acumulados';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardGeototalPage') {
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
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiMWQ5MTZjOTctMTc1MC00ODc0LTk0ZTQtYWY2ZDc3ZGVkMzJlIiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
    const browser = this._inAppBrowser.create(url, '_system');
  }

}
