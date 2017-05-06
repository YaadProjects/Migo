import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';


import { APP_NAME } from '../../app-types/app-types';
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
  appTitle: string = APP_NAME;
  userLoggedIn: boolean;
  loginSubscription: Subscription;
  loader: any;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public viewCtrl: ViewController,
    private loaderCtrl: LoadingController
  ) {
    this.loader = this.loaderCtrl.create({
      content: 'Please wait',
      duration: 3000
    });
  }

  facebookLogin(): void {
    this.loader.present();
    this.auth.loginWithFacebook();
  }

  dismiss(): Promise<any> {
    return this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.loginSubscription = this.auth.stateChangeEvent.subscribe((value: String) => {
      console.log('value login', value);
      if (value.includes('login')) {
        this.checkUserAndNavigate(value);
      } else if (value.includes('logout')) {
        this.loginSubscription.unsubscribe();
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  private checkUserAndNavigate(value):void {
    this.loader.dismiss();
    // Check the profile info
    // No Profile direct him to fill out the profile
    // If Driver take him to My trips Page
    // If Passenger take him to Show All Trips
    if (value.includes('driver')) {
      this.navCtrl.setRoot(MyTripsPage);
    } else if (value.includes('passenger')) {
      this.navCtrl.setRoot(AllTripsPage)
    } else {
      this.navCtrl.setRoot(ProfilePage)
    }
  }

  // ngOnDestroy() {
  //   if (!this.loginSubscription.closed) {
  //     this.loginSubscription.unsubscribe();
  //   }
  // }
}
