import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  name = '';
  id = '';

  constructor(private actRoute: ActivatedRoute, private nav: NavController) {
    this.name = this.actRoute.snapshot.paramMap.get('roomName');
    this.id = this.actRoute.snapshot.paramMap.get('roomID');
  }

  ngOnInit() {
  }

  goBack() {
    this.nav.navigateBack('main-menu');
  }

}
