import { Storage } from '@ionic/storage';
import { AlertProvider } from './../services/alerts';
import { ApiService } from './../services/apiService';
import { Jobs } from './../models/jobs.model';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { CreatejobPage } from '../modals/createjob/createjob.page';
import { StorageService } from '../services/storage.service';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  loading;
  jobs: Jobs[];
  user: any;
  constructor(public toastController: ToastController,
              public actionSheetController: ActionSheetController,
              public apiService: ApiService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public modalController: ModalController,
              public alertProvider: AlertProvider,
              private storageService: StorageService
              // private androidPermissions: AndroidPermissions,
  ) {
    this.storageService.get('name').then((res) => {this.user = res; });

  }

  ionViewWillEnter() {
    this.getJobs();
  }



  async openModal() {
    const modal = await this.modalController.create({
      component: CreatejobPage,
    });
    modal.onDidDismiss().then(() => {
      this.getJobs();
    });
    return await modal.present();
  }


//   checkPermissionAndSend(id, assignedTo, title, dueDate, phone) {

//     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
//       success => {
//         if (!success.hasPermission) {
//           this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).
//             then((suc) => {
//               this.sendReminder(id, assignedTo, title, dueDate, phone);
//             },
//               (err) => {
//                 console.error(err);
//               });
//         } else {
//           this.sendReminder(id, assignedTo, title, dueDate, phone);
//   }
// },
// err => {
//   this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).
//     then((success) => {
//       this.sendReminder(id, assignedTo, title, dueDate, phone);
//     },
//       (er) => {
//         console.error(er);
//       });
// });
// }

// sendReminder(id, assignedTo, title, dueDate, phone) {
//   const reminder = `RE: ${title}. Please be reminded that the due date
//    for this job is ${dueDate} Thank you.`;
//   if (SMS) {
//     SMS.sendSMS(phone, reminder, () => {
//         console.log('Message sent successfully');
//     }, (error) => {
//         console.error(error);
//     });
// }
// }

async presentToast(toastMessage) {
  const toast = await this.toastController.create({
    message: toastMessage,
    cssClass: 'error',
    duration: 2000,
    mode: 'ios',
  });
  toast.present();
}


async createJobs() {
  this.loading = await this.loadingController.create({
    message: 'Please wait...',
    mode: 'ios'

    // duration: 2000
  });
  await this.loading.present();
  //     this.apiService.createjob().subscribe((res) => {

  // })
}

async getJobs() {
  const loading = await this.loadingController.create({
    spinner: 'bubbles', showBackdrop: true, cssClass: 'loadingWrapper', mode: 'ios'
  });
  loading.present();
  this.apiService.getJobs().subscribe((res) => {
    this.jobs = res;
    loading.dismiss();
  }, (err) => {
    loading.dismiss();
    const data = {
      headers: 'No Internet',
      messages: 'Please Check internet connection',
    };
    this.alertProvider.alerts(data);
  });

}

updateJob(id, assignedTo) {
  this.loading = this.loadingController.create({
    message: 'Please wait...',
    mode: 'ios',

    // duration: 2000
  });
  this.loading.present();
  this.apiService.updateJob(id, assignedTo).subscribe(() => {
    this.getJobs();
    this.loading.dismiss();
    const toastMessage = 'Completed';
    this.alertProvider.presentToast(toastMessage);
  },
    (err) => {
      const toastError = err;
      this.alertProvider.presentToast(toastError);
    });
}


async presentActionSheet(id, assignedTo, title, dueDate, phone, assignedBy) {
  if (this.user === assignedBy ) {
  console.log(id);
  const actionSheet = await this.actionSheetController.create({
    mode: 'ios',
    header: title,
    buttons: [{
      text: 'Completed',
      icon: 'checkmark-done-sharp',
      handler: () => {
        this.updateJob(id, assignedTo);
      }
    }, {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.deleteJob(id, assignedTo);
      }
    }
    // , {
    //   text: 'Send Reminder',
    //   icon: 'chatbox-ellipses',
    //   handler: () => {
    //     this.checkPermissionAndSend(id, assignedTo, title, dueDate, phone);
    //   }
    // }
  ]
  });
  await actionSheet.present();

} else {
  const toastMessage = 'ACCESS DENIED';
  this.alertProvider.presentToast(toastMessage);
}
}

async deleteJob(id, assignedTo) {
  this.loading = await this.loadingController.create({
    message: 'Please wait...',
    mode: 'ios',

    // duration: 2000
  });
  this.apiService.deleteJob(id, assignedTo).subscribe(() => {
    this.loading.dismiss();
    const toastMessage = 'Deleted';
    this.presentToast(toastMessage);
    this.getJobs();
  },
    (err) => {
      console.log(err);
      const toastError = err;
      this.presentToast(toastError);
    });

}

async doRefresh(event) {
  this.getJobs();
  await event.target.complete();

}
}
