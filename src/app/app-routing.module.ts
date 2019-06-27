import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'creategroup-modal', loadChildren: './creategroup-modal/creategroup-modal.module#CreategroupModalPageModule' },
  { path: 'main-menu', loadChildren: './main-menu/main-menu.module#MainMenuPageModule' },
  { path: 'room/:roomName/:roomID', loadChildren: './room/room.module#RoomPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
