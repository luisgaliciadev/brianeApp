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
    
  }

  async verificarTema() {    
    const tema = await this._storage.get('brianeAppTema');
    // console.log('tema', tema);
    if (tema) {
      this.modoOscuro = true;
      // console.log('existe');
      document.body.classList.toggle('dark');
    } else {
      console.log('no existe');
      // this.modoOscuro = false;
      document.body.classList.toggle('dark1');
    }
    // console.log('tema oscuro:', this.modoOscuro)  
  }
}
