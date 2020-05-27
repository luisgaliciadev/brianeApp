import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  
  title = 'Consultas';
  subscribe: any;

  constructor(
    public _platform: Platform,
    private _router: Router
  ) { }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'ConsultasPage') {
        this.subscribe.unsubscribe();
        this._router.navigate(['/tab-inicio']);
      }
    });
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
    // console.log('Fuera de inicio');
  }

  ngOnInit() {
  }

}
