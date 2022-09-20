import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {ToastController } from '@ionic/angular';


@Injectable()
export class AlertProvider {
  backButtonSubscription;

  constructor(private toastCtrl: ToastController, private alertController: AlertController) {
      }


async alerts(data) {
    const alert = await this.alertController.create({
        header: data.headers,
        message: data.messages,
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
            text: 'Ok',
            handler: () => {
            }
          }
        ]
      });

    await alert.present();
}




async presentToast(toastMessage) {
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration: 1000,
      cssClass: 'error',
      mode: 'ios'
    });
    toast.present();
  }


}

