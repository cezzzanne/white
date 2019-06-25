import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainMenuPage } from './main-menu.page';

const routes: Routes = [
  {
    path: 'pages',
    component: MainMenuPage,
      children: [
          {
            path: 'home',
              loadChildren: '../main/main.module#MainPageModule'
          },
          {
            path: 'profile',
              loadChildren: '../profile/profile.module#ProfilePageModule'
          }
      ]
  },
    {
      path: '',
        redirectTo: '/main-menu/pages/home'
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainMenuPage]
})
export class MainMenuPageModule {}
