import { Component, Inject } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AuthMethods, AuthProviders, AngularFire, FirebaseRef } from 'angularfire2';

import { Auth } from '../../providers/auth';
import { UserSelectionPage } from '../user-selection/user-selection';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public auth: Auth,
    public af: AngularFire,
    //public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {


  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
       this.dismiss().then(() => this.navCtrl.setRoot(UserSelectionPage))
      }
    });
  }

  facebookLogin(): void {
    this.auth.loginWithFacebook();
  }

  googleLogin(): void {
    this.auth.loginWithGoogle();
  }

  dismiss(): Promise<any> {
    return this.viewCtrl.dismiss();
  }


}
