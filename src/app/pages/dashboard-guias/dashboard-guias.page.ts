import { Component, OnInit } from '@angular/core';

// Native
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-guias',
  templateUrl: './dashboard-guias.page.html',
  styleUrls: ['./dashboard-guias.page.scss'],
})
export class DashboardGuiasPage implements OnInit {

  title = 'KPI Operaciones';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      if (this.constructor.name === 'DashboardGuiasPage') {
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
      let url = 'https://app.powerbi.com/view?r=eyJrIjoiZWVhMTllNDUtZjY3My00N2NhLWEzM2YtZTk0MmYxN2RhMTQ4IiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9';
      const browser = this._inAppBrowser.create(url, '_system');
    }

}
