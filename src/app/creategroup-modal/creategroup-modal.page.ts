import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-creategroup-modal',
  templateUrl: './creategroup-modal.page.html',
  styleUrls: ['./creategroup-modal.page.scss'],
})
export class CreategroupModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
