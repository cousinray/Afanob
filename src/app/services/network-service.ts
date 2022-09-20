import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import {ToastController } from '@ionic/angular';
import { fromEvent, merge, of, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class NetworkServiceProvider {
  private connectionToast;
  private online$: Observable<boolean> = undefined;

  constructor(private network: Network, private toastCtrl: ToastController, private platform: Platform) {
    this.online$ = Observable.create(observer => {
      observer.next(true);
  }).pipe(mapTo(true));

    if (this.platform.is('cordova')) {
      // on Device
      this.online$ = merge(
          this.network.onConnect().pipe(mapTo(true)),
          this.network.onDisconnect().pipe(mapTo(false))
      );
  } else {
      // on Browser
      this.online$ = merge(
          of(navigator.onLine),
          fromEvent(window, 'online').pipe(mapTo(true)),
          fromEvent(window, 'offline').pipe(mapTo(false))
      );
  }
}

public getNetworkType(): string {
  return this.network.type;
}

public getNetworkStatus(): Observable<boolean> {
  return this.online$;
}





async showAlert() {
  if (this.connectionToast == null || this.connectionToast === undefined) {
    this.connectionToast = await this.toastCtrl.create({
      message: 'YOU ARE NOT CONNECTED TO THE INTERNET',
      cssClass: 'error',
      position: 'top',
      color: 'danger'
    });
    this.connectionToast.present();
  }
}


}

