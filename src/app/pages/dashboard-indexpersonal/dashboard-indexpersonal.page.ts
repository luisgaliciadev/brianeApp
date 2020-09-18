import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-indexpersonal',
  templateUrl: './dashboard-indexpersonal.page.html',
  styleUrls: ['./dashboard-indexpersonal.page.scss'],
})
export class DashboardIndexpersonalPage implements OnInit {

  title = 'Index de Personal';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardIndexpersonalPage') {
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
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiOGNiZjJiYWItYTI2NC00NDBiLWJiN2UtMTBiNzhmYzkxYzE5IiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
    const browser = this._inAppBrowser.create(url, '_system');
  }

}
