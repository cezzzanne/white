import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-creategroup-modal',
  templateUrl: './creategroup-modal.page.html',
  styleUrls: ['./creategroup-modal.page.scss'],
})
export class CreategroupModalPage implements OnInit {

  constructor(private modalController: ModalController, private nav: NavController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async addGroup() {
    console.log('here');
    this.modalController.dismiss();
    this.nav.navigateRoot('/main-menu');
  }

}
