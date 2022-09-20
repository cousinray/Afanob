import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatejobPage } from './createjob.page';

const routes: Routes = [
  {
    path: '',
    component: CreatejobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatejobPageRoutingModule {}
