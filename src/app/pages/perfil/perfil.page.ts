import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController } from '@ionic/angular';
// import { FilePath } from '@ionic-native/file-path/ngx';
import { URL_SERVICES } from '../../config/config';
import { User } from 'src/app/models/user.model';


const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  URL: string;
  title = 'Mi Perfil';
  subscribe: any;
  userImage = '';
  nombre = '';
  email = '';
  telefono = '';
  user: User;
  optionsCamera: CameraOptions;
  imageUpload;
  tempImage: string;
  fgAction = false;
  images = [];

  constructor(
    public _platform: Platform,
    public _router: Router,
    public _userService: UserService,
    private _navController: NavController,
    // private _webView: WebView,
    private _camera: Camera,
    private _actionSheetController: ActionSheetController,
    // private _filePath: FilePath
  ) { 
    this.URL = URL_SERVICES;
  }

  ionViewDidEnter() {
    this.subscribe = this._platform.backButton.subscribeWithPriority(1, () => {
      // if (this.constructor.name === 'PerfilPage') {
        if (this.fgAction) {
          this._actionSheetController.dismiss();
          this.fgAction = false;
        } else {
          this._navController.pop();
        }   
      // }
    });    
  }

  ionViewDidLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
    this.user = this._userService.user;
    this.nombre = this.user.NAME;
    this.email = this.user.EMAIL;
    this.telefono = this.user.PHONE;
    var imagen = this._userService.user.IMAGE;
    if (imagen) {
      this.userImage = this.URL + '/image/user/' + this._userService.user.IMAGE;
    } else {
      this.userImage = this.URL + '/image/user/0' ;
    }
  }


  selectImage(file) {
    if (!file) {
      this.imageUpload = null;
      return;
    } else {

      if (file.type.indexOf('image') < 0) {
        this.imageUpload = null;
        // Swal.fire('Mensaje', 'Disculpe, tipo de archvio no valido', 'warning');
        alert('Disculpe, tipo de archvio no valido');
        return;
      }
      this.imageUpload = file;

    }
  }

  changeImage() {
    this._userService.changeImage(this.imageUpload, this.user.ID_USER).then(
      image => {
        // console.log('image:', image);
        if (image) {
          this.userImage = this.URL + '/image/user/' + this._userService.user.IMAGE;
          // this.userImage = this.tempImage;
          this.tempImage = '';
        }
      }
    );
  }

  foto (opcion) {
    this.fgAction = false;
    if (opcion > 0) {
      if (opcion == 1) {
          this.optionsCamera  = {
          quality: 50,
          destinationType: this._camera.DestinationType.DATA_URL,
          encodingType: this._camera.EncodingType.JPEG,
          mediaType: this._camera.MediaType.PICTURE,
          sourceType: this._camera.PictureSourceType.PHOTOLIBRARY,
          correctOrientation: true,
          allowEdit: true,
          
        }
      }
      if (opcion == 2) {
          this.optionsCamera  = {
          quality: 50,
          destinationType: this._camera.DestinationType.DATA_URL,
          encodingType: this._camera.EncodingType.JPEG,
          mediaType: this._camera.MediaType.PICTURE,
          sourceType: this._camera.PictureSourceType.CAMERA,
          correctOrientation: true,
          allowEdit: true
        } 
      }
      
      this._camera.getPicture(this.optionsCamera).then( async (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.tempImage = base64Image;
        let file: any = this.DataURIToBlob(base64Image);
        let arrayType = file.type.split('/');
        let name = this.user.ID_USER + '.' + arrayType[1];
        file.name = name;
        // console.log(file);
        this.selectImage(file);
       }, (err) => {
        // Handle error
      });
    } 
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  saveProfile() {
    this._userService.updateProfile(this.user).subscribe(
      // response => {
      //   console.log(response);
      //   // Swal.fire('Mensaje', 'Usuario Registrado Correctamente', 'success');
      //   // console.log(response);
      // }
    );
  }

  async buscarFoto() {
    const actionSheet = await this._actionSheetController.create({
      header: 'Buscar Foto',
      // cssClass: 'actionAlert',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [{
        text: 'Galeria',
        role: 'destructive',
        icon: 'images',
        cssClass: 'actionAlert',
        handler: () => {
          this.foto(1);
        }
      }, {
        text: 'Camara',
        icon: 'camera',
        // cssClass: 'actionAlert',
        handler: () => {
          this.foto(2);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        // cssClass: 'actionAlert',
        handler: () => {
          this.foto(0);
          this.fgAction = false;
        }
      }]
    });
    this.fgAction = true;
    await actionSheet.present();
  }
  
}
