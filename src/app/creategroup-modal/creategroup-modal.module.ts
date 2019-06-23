import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreategroupModalPage } from './creategroup-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreategroupModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreategroupModalPage]
})
export class CreategroupModalPageModule {}
