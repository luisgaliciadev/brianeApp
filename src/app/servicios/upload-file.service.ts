import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: number, idUser: number) {

    return new Promise( (resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      
      formData.append('image', file, file.name );
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log('archivo cargado');
            resolve (JSON.parse(xhr.response));

          } else {
            // console.log('Fallo la subida');
            reject (JSON.parse(xhr.response));
          }
        }
      };

      let url = URL_SERVICES + '/upload/' + type + '/' + id + '/' + idUser;
      // console.log('url:' + url);

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }

}
