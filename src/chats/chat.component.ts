import {Component, OnInit} from "@angular/core";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Auth} from "../providers/auth";
import {NavController} from 'ionic-angular';

import {ChatElementComponent} from "./components/chat-element.component";


@Component({
  selector:'chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit{

  chatList: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;

  otherUserId: string;

  constructor(private af:AngularFire, public auth: Auth, private nav: NavController){

  }

  ngOnInit() {
    this.users = this.af.database.list(`users`);
    this.chatList = this.af.database.list(`chats/${this.auth.uid}`);
  }

  moveToChatBox(user) {
    this.otherUserId = null;
    setTimeout(()=>this.otherUserId = user.uid);
    //this.nav.push(ChatElementComponent,{user});
  }

}
