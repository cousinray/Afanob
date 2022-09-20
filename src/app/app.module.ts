import { AlertProvider } from './services/alerts';
import { NetworkServiceProvider } from './services/network-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwipeTabDirective } from './directives/swipe-tab.directive';
import { HttpClientModule, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            HttpClientModule,
            IonicModule.forRoot(),
            IonicStorageModule.forRoot({
              name: '_myDb',
              driverOrder: ['localstorage']
            }),
            AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SwipeTabDirective,
    DatePipe,
    CallNumber,
    MobileAccessibility,
    // AndroidPermissions,
    Network,
    NetworkServiceProvider,
    AlertProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
