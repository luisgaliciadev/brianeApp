import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-dashboard-inventarioti',
  templateUrl: './dashboard-inventarioti.page.html',
  styleUrls: ['./dashboard-inventarioti.page.scss'],
})
export class DashboardInventariotiPage implements OnInit {

  title = 'Inventario TI';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }


  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardInventariotiPage') {
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
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiYjkyNWZkYzgtNDNhNy00MDY3LWE4MDYtNzFlMDhlNDY3ZGQ3IiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
    const browser = this._inAppBrowser.create(url, '_system');
  }

}
