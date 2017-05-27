import {Component, Input} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Auth} from "../../providers/auth";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {database} from 'firebase';


interface Chat{
  message: string,
  from: string,
  created_at: any
}


@Component({
  selector: 'chat-element',
  templateUrl: './chat-element.component.html'
})
export class ChatElementComponent{
  chatRoom: FirebaseListObservable<Chat[]>;
  otherChatRoom: FirebaseListObservable<Chat[]>;
  message: string;
  @Input()userId:string;
  @Input()otherUserId;

 constructor(
 //private nav: NavController,
 //private params: NavParams,
 //public auth:Auth,
 private af:AngularFire){
 }

 ngOnInit(){
  this.chatRoom = this.af.database.list(`chats/${this.userId}/${this.otherUserId}`);
  this.otherChatRoom = this.af.database.list(`chats/${this.otherUserId}/${this.userId}`);
 }

 addMessage(){
   let chat:Chat = {message: this.message,
      from: this.otherUserId,
      created_at: database.ServerValue.TIMESTAMP
   }
   this.chatRoom.push(chat);
   this.otherChatRoom.push(chat);
   this.message = '';
 }

}



