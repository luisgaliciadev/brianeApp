import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './componentes/components.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ServiceModule } from './servicios/service.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ComponentsModule, 
    FormsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    ServiceModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    // QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
