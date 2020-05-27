import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  title = 'Ayuda';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'AyudaPage') {
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

  salir() {}

}
