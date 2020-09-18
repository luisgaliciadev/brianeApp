import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public modoOscuro: boolean;

  constructor(
    private _storage: Storage
  ) {
    this.verificarTema();
  }

  async verificarTema() {    
    const tema = await this._storage.get('brianeAppTema');
    if (tema) {
      this.modoOscuro = true;
      document.body.classList.toggle('dark');
    } else {
      document.body.classList.toggle('dark1');
    } 
    
  }
}
