import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';


import { appName } from '../../app-types/app-types';

import { Auth } from '../../providers/auth';

import { Subscription } from 'rxjs/Subscription';

import { ProfilePage } from '../profile/profile';
import { MyTripsPage } from '../my-trips/my-trips';

import { AllTripsPage } from '../all-trips/all-trips';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  appTitle:string = appName;
  userLoggedIn:boolean;
  loginSubscription:Subscription;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public viewCtrl: ViewController
  ) {
  }

  facebookLogin(): void {
    this.auth.loginWithFacebook();
  }

  dismiss(): Promise<any> {
    return this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.loginSubscription = this.auth.stateChangeEvent.subscribe((value:String) => {
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
          this.navCtrl.setRoot(AllTripsPage).then(() => {
            this.dismiss();
          });
        } else {
          this.navCtrl.setRoot(ProfilePage).then(() => {
            this.dismiss();
          });
        }
      } else if(value.includes('logout')) {
        this.loginSubscription.unsubscribe();
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  // ngOnDestroy() {
  //   if (!this.loginSubscription.closed) {
  //     this.loginSubscription.unsubscribe();
  //   }
  // }
}
