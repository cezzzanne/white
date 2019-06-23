import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { CreategroupModalPage } from '../creategroup-modal/creategroup-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public conversation = '';
  public message = '';
  // public socket;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
      // this.socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/123/');
      //
      // this.socket.onmessage = e => {
      //     const data = JSON.parse(e.data);
      //     const message = data.message;
      //     console.log(message);
      //     this.conversation += (message + '\n');
      // };
      //
      // this.socket.onclose = e => {
      //     console.error('Chat socket closed unexpectedly');
      // };
  }

  // sendMessage() {
  //     this.socket.send(JSON.stringify({
  //         message: this.message
  //     }));
  //
  // }

    async createGroup() {
        const modal = await this.modalController.create({
            component: CreategroupModalPage,
        });
        modal.present();
    }
}
