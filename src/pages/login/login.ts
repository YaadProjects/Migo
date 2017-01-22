import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';

import { appName } from '../../app-types/app-types';

import { Auth } from '../../providers/auth';
import { UserSelectionPage } from '../user-selection/user-selection';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  appTitle:string = appName;
  userLoggedIn:boolean;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public auth$: AngularFireAuth,
    public viewCtrl: ViewController
  ) {
      auth$.subscribe((state: FirebaseAuthState) => {
        if (state){
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
