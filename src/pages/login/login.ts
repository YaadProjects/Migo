import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthMethods, AuthProviders, AngularFire } from 'angularfire2';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public af: AngularFire
  ) {


  }

  ngOnInit() {
    this.af.auth.subscribe(auth =>
      console.log(auth)
    );
  }





}
