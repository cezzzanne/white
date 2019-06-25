import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  pages = [
      {
        title: 'Home',
          url: '/main-menu/pages/main'
      },
      {
        title: 'Profile',
          url: '/main-menu/pages/profile'
      }
  ];
  selectedPath = '/main-menu/pages/main';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
