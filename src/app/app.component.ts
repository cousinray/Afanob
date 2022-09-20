import { AlertProvider } from './services/alerts';
import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { NetworkServiceProvider } from './services/network-service';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {

  connectionToast;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private storageService: StorageService,
    private mobileAccessibility: MobileAccessibility,
    private router: Router,
    private toastCtrl: ToastController,
    public networkService: NetworkServiceProvider,
    public alertProvider: AlertProvider,
  ) {

    this.initializeApp();

    }


initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.networkCheck();
  });
  this.mobileAccessibility.usePreferredTextZoom(false);
  this.splashScreen.hide();

}

// checkLogin() {
//   this.storageService.get(name).then((res) => {
//     if (res !== null) {
//       this.router.navigateByUrl('tabs/tabs/tab1', res);
//     }
//     // console.log(res);
//   });
// }

networkCheck() {
  this.networkService.getNetworkStatus().subscribe((res) => {
    if (!res) {
      // console.log(res, this.connectionToast);
      this.showAlert();
    } else {
      if (this.connectionToast !== null && this.connectionToast !== undefined) {
        this.connectionToast.dismiss();
        this.connectionToast = null;
      }
    }
  }
  );
}

async showAlert() {
  if (this.connectionToast == null || this.connectionToast === undefined) {
    this.connectionToast = await this.toastCtrl.create({
      message: 'YOU ARE NOT CONNECTED TO THE INTERNET',
      cssClass: 'error',
      mode: 'ios',
      position: 'top',
    });
    this.connectionToast.present();
  }
}

}
