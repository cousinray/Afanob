import { ApiService } from './../services/apiService';
import { Component } from '@angular/core';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertProvider } from '../services/alerts';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loading;
  lawyers;
  searchQuery = '';
  searchedLawyers: any;

  constructor(
    private apiService: ApiService,
    public alertController: AlertController,
    public alertProvider: AlertProvider,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public callNumber: CallNumber) { }


  ionViewWillEnter() {
    this.getLawyers();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.searchLawyers();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.searchedLawyers = this.searchedLawyers.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();

    // const { role, data } = await loading.onDidDismiss();

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add Lawyer',
      mode: 'ios',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: 'Phone Number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            const lawyer = name;
            if (lawyer.name1.length > 0) {
              if (lawyer.phone.length > 0) {
              const data = {name: lawyer.name1, phone: lawyer.phone };
              this.createLawyer(data);
            } else {
              const toastMessage = 'Please insert phone';
              this.alertProvider.presentToast(toastMessage);
              return false;
            }

          } else {
            const toastMessage = 'Please insert name';
            this.alertProvider.presentToast(toastMessage);
            return false;
          }
        }
        }]
    });

    await alert.present();
  }

  async editActionSheet(lawyer) {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      cssClass: 'my-alert',
      header: lawyer.name,
      buttons: [{
        text: 'Edit',
        icon: 'checkmark-done-sharp',
        handler: () => {
          this.updateAlert(lawyer);
                }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteAlert(lawyer.id);
                }
      },
      {
        text: lawyer.name,
        icon: 'call-sharp',
        handler: () => {
          this.callLawyer(lawyer.phone);
        }
      }]
    });
    await actionSheet.present();
  }
  async createLawyer(data) {
    // this.presentLoading();
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();
    this.apiService.createLawyer(data).subscribe(() => {
      const toastMessage = 'Lawyer Added';
      this.alertProvider.presentToast(toastMessage);
      this.getLawyers();
    },
     (err) => {
      const toastError = err;
      console.log(toastError);
      this.alertProvider.presentToast(toastError);
    });

    await this.loading.dismiss();
  }

  async getLawyers() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles', showBackdrop: true, mode: 'ios',
    });
    await loading.present();
    this.apiService.getLawyers().subscribe((res) => {
      this.lawyers = res;
      this.searchLawyers();
      loading.dismiss();
      // console.log(this.lawyers);
    }, (err) => {
      loading.dismiss();
      const data = {
        headers: 'No Internet',
        messages: 'Please Check internet connection'
      };
      this.alertProvider.alerts(data);
    });
  }
  async deleteLawyer(id) {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    });

    this.apiService.deleteLawyer(id).subscribe((res) => {
      const toastMessage = 'Deleted';
      this.alertProvider.presentToast(toastMessage);
      this.getLawyers();
    },
    (err) => {
      console.log(err);
      const toastError = err.message;
      this.alertProvider.presentToast(toastError);
    });

    await this.loading.dismiss();
  }

  async updateAlert(lawyerData) {
    const alert = await this.alertController.create({
      header: 'Edit Lawyer',
      mode: 'ios',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: lawyerData.name,
          placeholder: 'Name'
        },
        {
          name: 'phone',
          type: 'number',
          value: lawyerData.phone,
          placeholder: 'Phone Number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            const lawyer = name;
            const data = {name: lawyer.name1, phone: lawyer.phone, id: lawyerData.id };
            this.updateLawyer(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateLawyer(data) {
    this.apiService.updateLawyer(data).subscribe((res) => {
      const toastMessage = 'Updated';
      this.alertProvider.presentToast(toastMessage);
      this.getLawyers();
    });
  }

  callLawyer(phone) {
console.log(phone);
this.callNumber.callNumber(phone, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }


  async deleteAlert(id) {
    const alert = await this.alertController.create({
      header: 'Delete Lawyer!',
      mode: 'ios',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteLawyer(id);
          }
        }
      ]
    });

    await alert.present();
  }



  searchLawyers() {
    this.searchedLawyers = this.lawyers;
  }

  async doRefresh(event) {
    this.getLawyers();
    await event.target.complete();

  }
}
