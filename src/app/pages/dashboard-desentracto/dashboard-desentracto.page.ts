import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-desentracto',
  templateUrl: './dashboard-desentracto.page.html',
  styleUrls: ['./dashboard-desentracto.page.scss'],
})
export class DashboardDesentractoPage implements OnInit {

  title = 'Desempeño de Tracto';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardDesentractoPage') {
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
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiOWRiNGQyMjUtNmE3Yy00MjRiLWJhNGQtOWJkYTEyNjkyOGUzIiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
    const browser = this._inAppBrowser.create(url, '_system');
  }


}
