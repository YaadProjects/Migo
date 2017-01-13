import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

import { appName } from '../../app-types/app-types';

import { Auth } from '../../providers/auth';
import { UserSelectionPage } from '../user-selection/user-selection';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  appTitle:string = appName;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public af: AngularFire,
    public viewCtrl: ViewController
  ) {}

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
