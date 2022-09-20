import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatejobPageRoutingModule } from './createjob-routing.module';
import { CreatejobPage } from './createjob.page';
import {IonicStorageModule } from '@ionic/storage';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatejobPageRoutingModule
  ],
  declarations: []
})
export class CreatejobPageModule {}
