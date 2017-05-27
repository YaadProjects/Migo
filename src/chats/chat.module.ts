import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule}from "@angular/forms";
import {IonicPageModule} from "ionic-angular";

//declarations
import {ChatComponent} from "./chat.component";
import {ChatElementComponent} from "./components/chat-element.component";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    IonicPageModule.forChild(ChatComponent)
  ],
  declarations:[
    ChatComponent,
    ChatElementComponent
  ],
  entryComponents:[
    ChatElementComponent
  ],
  exports:[

  ]
})
export class ChatModule{

}
