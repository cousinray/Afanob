import { AlertProvider } from './../services/alerts';
import { StorageService } from './../services/storage.service';
import { ApiService } from './../services/apiService';
import { Component} from '@angular/core';
import { Partnerjobs } from './../models/jobs.model';
import { ActionSheetController, AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {
  items = [];
  numTimesLeft = 5;
  name;
  jobs;
  loading;

  constructor(private apiService: ApiService,
              private storageService: StorageService,
              private alertProvider: AlertProvider,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private actionSheetController: ActionSheetController) {
                this.storageService.get(name).then((res) => {
                  this.name = res;
                });
  }


  ionViewWillEnter() {
    this.getPartnerData();
  }
  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      cssClass: 'error',
      mode: 'ios',
    });
    toast.present();
  }





  async getPartnerData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles', showBackdrop: true, cssClass: 'loadingWrapper', mode: 'ios'
    });
    await loading.present();
    this.apiService.getPartnerData(this.name).subscribe((res) => {
    this.jobs = res;
    loading.dismiss();
    // console.log(this.jobs);
  }, (err) => {
    loading.dismiss();
    const data = {
      headers: 'No Internet',
      messages: 'Please Check internet connection'
    };
    this.alertProvider.alerts(data);
  });
  }

  async doRefresh(event) {
    this.getPartnerData();
    await event.target.complete();

  }

}
