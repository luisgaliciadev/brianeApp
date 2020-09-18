import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-kpimantenimiento',
  templateUrl: './dashboard-kpimantenimiento.page.html',
  styleUrls: ['./dashboard-kpimantenimiento.page.scss'],
})
export class DashboardKpimantenimientoPage implements OnInit {

  title = 'Disponibilidad Mecánica';
  subscribe: any;

  constructor(
    private _inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'DashboardKpimantenimientoPage') {
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
    let url = 'https://app.powerbi.com/view?r=eyJrIjoiMDU5MDAwYzItYzdmZC00MzI3LWI1ODMtZWJhZGExOTU5NWNlIiwidCI6IjhjYzJjZGExLWVkNzQtNDc3YS04YWU5LTQyNWNmYjg1ZjE4MSJ9&pageName=ReportSection';
    const browser = this._inAppBrowser.create(url, '_system');
  }


}
