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
    auth.stateChangeEvent.subscribe((value) => {
      if (value === 'login'){
        this.navCtrl.setRoot(UserSelectionPage).then(() => this.dismiss());
      }
    });
  }

  facebookLogin(): void {
    this.auth.loginWithFacebook();
  }

  dismiss(): Promise<any> {
    return this.viewCtrl.dismiss();
  }
}
