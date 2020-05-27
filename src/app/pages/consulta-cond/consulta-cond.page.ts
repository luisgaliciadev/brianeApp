import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-consulta-cond',
  templateUrl: './consulta-cond.page.html',
  styleUrls: ['./consulta-cond.page.scss'],
})
export class ConsultaCondPage implements OnInit {

  title = 'Consulta';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'ConsultaCondPage') {
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
