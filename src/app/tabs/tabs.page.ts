import { AlertProvider } from './../services/alerts';
import { Router } from '@angular/router';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SwipeTabDirective } from '../directives/swipe-tab.directive';
import { IonTabs, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription;
  partner;
  @ViewChild(SwipeTabDirective, { static: false }) swipeTabDirective: SwipeTabDirective;
  @ViewChild('myTabs', { static: false }) tabRef: IonTabs;

  constructor(private storageService: StorageService, private platform: Platform, private router: Router,
              private alertController: AlertController, private alertProvider: AlertProvider) {

  }

  ngOnInit() {
    this.storageService.get('name').then((res) => {
      console.log(res);
      this.partner = res;
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.exitApp();
    });
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

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }



  ionTabsDidChange($event) {
    // console.log('[TabsPage] ionTabsDidChange, $event: ', $event);
    this.swipeTabDirective.onTabInitialized($event.tab);
  }

  onTabChange($event) {
    // console.log('[TabsPage] onTabChange, $event: ', $event);
    this.tabRef.select($event);
  }

  async logout() {
    this.storageService.clear();
    await this.router.navigateByUrl('');
    this.storageService.get('name').then((res) => {
      console.log(res);
    });
  }

// async changeAdmin() {
//   const admin =  this.storageService(set: name)
// }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
