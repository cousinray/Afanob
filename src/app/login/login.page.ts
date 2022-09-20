import { ApiService } from './../services/apiService';
import { AlertProvider } from './../services/alerts';
import { StorageService } from './../services/storage.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit, OnDestroy {
  public partner: string;
  backButtonSubscription;

  error: string;
  constructor(
    private router: Router, private storageService: StorageService,
    private platform: Platform,
    private alertProvider: AlertProvider,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController) {
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  async exitApp() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Do you want to exit app?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
      navigator[`app`].exitApp();
  }

        }
      ]
    });
    await alert.present();
  }
  // async login(partner) {
  //   const loading = await this.loadingController.create({
  //     spinner: 'bubbles', showBackdrop: true, cssClass: 'loadingWrapper', mode: 'ios'
  //   });
  //   await loading.present();
  //   await this.networkService.getNetworkStatus().subscribe((res) => {
  //     if (res) {
  //       if (partner !== undefined && partner !== '') {
  //         this.apiService.login(partner).subscribe((resp) => {
  //           loading.dismiss();
  //           console.log(resp.name);
  //           this.storageService.set(name, resp.name).then(() => {
  //             this.router.navigateByUrl('tabs/tabs/tab1');
  //           });
  //         }, (err) => {
  //           const data = {
  //             headers: 'Login Failed',
  //             messages: `${this.partner}` + ` ${err.error.text}`
  //           };
  //           loading.dismiss();
  //           this.alertProvider.alerts(data);
  //         });
  //       } else {
  //         const err = {
  //           headers: 'Fill Form',
  //           messages: 'No Name entered'
  //         };
  //         this.alertProvider.alerts(err);
  //       }
  //     } else {
  //       const data = {
  //         headers: 'No Internet',
  //         messages: 'Please Check internet connection',
  //       };
  //       this.alertProvider.alerts(data);      }
  //   });
  // }

  async login(partner) {
    let login: any;
    const loading = await this.loadingController.create({
      spinner: 'bubbles', showBackdrop: true, cssClass: 'loadingWrapper', mode: 'ios'
    });
    await loading.present();
    if (partner !== undefined && partner !== '') {
      this.apiService.login(partner).subscribe((resp) => {
        login = resp;
        this.storageService.set(name, login.name).then(() => {
          this.router.navigateByUrl('/tabs');
          loading.dismiss();
        });
      }, (err) => {
        const data = {
          headers: 'Login Failed',
          messages: err
        };
        loading.dismiss();
        this.alertProvider.alerts(data);
      });
    } else {
      const err = {
        headers: 'Fill Form',
        messages: 'No Name entered'
      };
      loading.dismiss();
      this.alertProvider.alerts(err);
    }
  }
}


// if (!err.error) {
//   const data = {
//  headers: 'Login failed',
//  messages: 'Please check internet connection'
// };
//   loading.dismiss();
//   this.alertProvider.alerts(data);
// } else {
//  const data = {
//    headers: 'Login Failed',
//    messages: err.error.text
//  };
//  loading.dismiss();
//  this.alertProvider.alerts(data);
// }
