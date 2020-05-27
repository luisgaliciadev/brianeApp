import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(
    public _router: Router,
  ) { }

  ngOnInit() {}

  salir() {
    if (window.confirm('¿Desea Cerrar la Sesión?')) {
      this._router.navigate(['/login']);
    }
  }

  back() {
    this._router.navigate(['/tab-inicio']);
  }

}
