import { AlertProvider } from './../../services/alerts';
import { Jobs } from './../../models/jobs.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/apiService';
import { DatePipe } from '@angular/common';
import { LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.page.html',
  styleUrls: ['./createjob.page.scss'],
})
export class CreatejobPage implements OnInit {
  public minDate;
  lawyers;
  loading;
  year;
  assignedto;
  currentDate;
  data: Jobs = {
    id: null,
    title: null,
    type: null,
    assigned_to: null,
    phone: null,
    assigned_by: null,
    date: null,
    dueDate: null,
    status: 'PENDING'
  };



  constructor(private apiService: ApiService,
              private modalController: ModalController,
              public datePipe: DatePipe,
              public loadingController: LoadingController,
              public storageService: StorageService,
              public alertProvider: AlertProvider
  ) {
    this.storageService.get('name').then((res) => {
      this.data.assigned_by = res;
      console.log(this.data);
    });
  }
  ngOnInit() {
    this.getLawyers();

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await this.loading.present();

    // const { role, data } = await loading.onDidDismiss();
  }


  ionViewDidEnter() {
    const date = new Date().toDateString();
    this.minDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    // console.log(date, this.minDate);
    this.data.date = new Date(date).toLocaleDateString(
      undefined, {weekday: 'short', month: 'short', day: 'numeric'});
    // console.log(data);
    this.year = new Date().getFullYear();
  }



  async closeModal() {
    await this.modalController.dismiss();
  }



 async getLawyers() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles', showBackdrop: true, mode: 'ios',
    });
    await loading.present();
    this.apiService.getLawyers().subscribe((res) => {
      this.lawyers = res;
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


  async createJob(data) {
    console.log(data);
    console.log(this.data);
    data.assigned_to = this.assignedto.name;
    data.phone = this.assignedto.phone;
    const validError = 'Please fill all fields';
    data.dueDate = new Date(data.dueDate).toLocaleDateString(
      undefined, {weekday: 'short', month: 'short', day: 'numeric'});
    // console.log(data);
    if (this.data.title !== '' && this.data.title !== null) {
    if (this.data.type !== '' && this.data.type !== null) {
      if (this.data.assigned_to !== '' && this.data.assigned_to !== null) {
        if (this.data.dueDate !== '' && this.data.dueDate !== null) {
          this.loading = await this.loadingController.create({
            message: 'Please wait...',
            // duration: 2000
          });
          await this.loading.present();
          this.apiService.createjob(data).subscribe(() => {
            const toastMessage = 'Job Created';
            this.alertProvider.presentToast(toastMessage);
            this.loading.dismiss();
            this.closeModal();

          },
            (err) => {
              const toastError = err;
              // console.log(toastError);
              this.loading.dismiss();
              this.alertProvider.presentToast(toastError);
            });

        } else {
          this.alertProvider.presentToast(validError);
        }
      } else {
        this.alertProvider.presentToast(validError);
      }
    } else {
      this.alertProvider.presentToast(validError);
    }
    } else {
      this.alertProvider.presentToast(validError);
    }
  }
}
