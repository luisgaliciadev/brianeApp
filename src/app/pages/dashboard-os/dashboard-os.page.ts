import { Component, OnInit } from '@angular/core';

// Native
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-os',
  templateUrl: './dashboard-os.page.html',
  styleUrls: ['./dashboard-os.page.scss'],
})
export class DashboardOsPage implements OnInit {

  title = 'Ordenes Servicios';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      if (this.constructor.name === 'DashboardOsPage') {
        this._router.navigate(['/tab-inicio/consultas']);
      }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
  }

  verDashboard() {
  // console.log(this.noticia.url);
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiMjk0MTBlZGYtNjIxZi00ZWVkLWFhNDgtNDZiYTNhYjU4NDUzIiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
    const browser = this._inAppBrowser.create(url, '_system');
  }

  

}
