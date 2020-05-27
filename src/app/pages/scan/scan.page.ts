import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  title = 'Scan QR';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'ScanPage') {
        this.subscribe.unsubscribe();
        this._router.navigate(['/tab-inicio']);
      }
    });
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
  }

}
