import { Component, OnInit} from '@angular/core';
import { NavController, ViewController, LoadingController, Loading, Events } from 'ionic-angular';


import { APP_NAME } from '../../app-types/app-types';
import { ALL_PAGES} from "../../app/app.component";
import { Auth } from '../../providers/auth';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  appTitle: string = APP_NAME;
  userLoggedIn: boolean;
  loginSubscription: Subscription;
  loader: Loading;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public viewCtrl: ViewController,
    private loaderCtrl: LoadingController,
    private events: Events
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
    let rootElement;
    if (value.includes('driver')) {
      rootElement = ALL_PAGES.myTrips;
    } else if (value.includes('passenger')) {
      rootElement = ALL_PAGES.allTrips;
    } else {
      rootElement = ALL_PAGES.profile;
    }

      this.events.publish('page-changed', rootElement);
      this.navCtrl.setRoot(rootElement.component);
    //For testing Chat Feature.
   // this.navCtrl.setRoot(ChatComponent);

  }

  // ngOnDestroy() {
  //   if (!this.loginSubscription.closed) {
  //     this.loginSubscription.unsubscribe();
  //   }
  // }
}
