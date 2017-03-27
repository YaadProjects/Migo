import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

import { appName } from '../../app-types/app-types';

import { Auth } from '../../providers/auth';
import { ProfilePage } from '../profile/profile';
import { MyTripsPage } from '../dashboard/dashboard';


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
    private af: AngularFire,

    // public auth$: AngularFireAuth,
    public viewCtrl: ViewController
  ) {
    auth.stateChangeEvent.subscribe((value:String) => {
      console.log('value login', value);
      if (value.includes('login')){
        // Check the profile info
        // No Profile direct him to fill out the profile
        // If Driver take him to My trips Page
        // If Passenger take him to Show All Trips
        if (value.includes('driver')) {
          this.navCtrl.setRoot(MyTripsPage).then(() => {
            this.dismiss();
          });
        } else if (value.includes('passenger')) {
          // this.navCtrl.setRoot(ProfilePage).then(() => {
          //   this.dismiss();
          // });
        } else {
          this.navCtrl.setRoot(ProfilePage).then(() => {
            this.dismiss();
          });
        }
      } else {
        this.navCtrl.setRoot(LoginPage);
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
