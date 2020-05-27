import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ayuda-cond',
  templateUrl: './ayuda-cond.page.html',
  styleUrls: ['./ayuda-cond.page.scss'],
})
export class AyudaCondPage implements OnInit {

  title = 'Ayuda';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'AyudaCondPage') {
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
