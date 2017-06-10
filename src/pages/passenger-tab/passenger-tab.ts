import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { PassengerTripConfirmPage } from './../passenger-trip-confirm/passenger-trip-confirm';
import { ChatComponent } from './../../chats/chat.component';

@Component({
  template: `
    <ion-tabs>
      <ion-tab tabTitle="Trip-Details" [root]="tab1" [rootParams]="params"></ion-tab>
      <ion-tab tabTitle="Chat" enabled="false" [root]="tab2"></ion-tab>
    </ion-tabs>`
})
export class PassengerTab {

  tab1: any;
  tab2: any;

  constructor(
    public params: NavParams
  ) {
    this.tab1 = PassengerTripConfirmPage;
    this.tab2 = ChatComponent;
  }
}
