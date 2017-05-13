import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Platform , Nav, AlertController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { DriverPage } from '../pages/driver/driver';
import { MyTripsPage } from '../pages/my-trips/my-trips';
import { ProfilePage } from '../pages/profile/profile';

import { PassengerPage } from '../pages/passenger/passenger';
import { AllTripsPage } from '../pages/all-trips/all-trips';

import {Auth} from '../providers/auth';

import { Subscription } from 'rxjs/Subscription';

import {Push, PushObject, PushOptions} from "@ionic-native/push";
import { AngularFire } from 'angularfire2';

@Component({
  template: `
  <ion-menu side="left" [content]="content" persistent="true">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
          <ion-list>
          <button menuClose ion-item *ngFor="let page of MenuPages" (click)="openPage(page)">
            {{page.title}}
          </button>
          <button menuClose ion-item (click)="logout()">
            Log Out
          </button>
          </ion-list>
      </ion-content>
  </ion-menu>
  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
   `
})
export class MyApp  implements OnDestroy {
  // Vars
  rootPage = LoginPage;
  @ViewChild(Nav) nav;
  driverPage = { title: 'New Trip', component : DriverPage  };
  profilePage = { title: 'Profile', component: ProfilePage };
  dashboardPage = { title: 'My Trips', component: MyTripsPage };
  passengerPage = { title: 'New Trip', component: PassengerPage};
  allTripsPage = { title: 'All Driver Trip', component: AllTripsPage};
  loginSubscription:Subscription;

  MenuPages:Array<any> = [];

  options: PushOptions = {
    android: {
      senderID: "166754869050"
    },
    ios: {
      alert: "true",
      badge: false,
      sound: "true"
    },
    windows: {}
  };

  pushObject:PushObject;
  deviceTokenforPushRegistration:string;

  constructor(public platform: Platform,
              public auth: Auth,
              public push: Push,
              private alertCtrl: AlertController,
              private af: AngularFire
              // private navCtrl: NavController
              ) {

    this.auth = auth;
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.pushObject = this.push.init(this.options);

      this.pushObject.on('registration').subscribe((data: any) => {
        this.deviceTokenforPushRegistration = data.registrationId;
        console.log("device token ->", data.registrationId);
      });

    });

    this.loginSubscription = this.auth.stateChangeEvent.subscribe((value:String) => {
      if (value.includes('login')) {

        this.initPushNotification();

        if(value.includes('driver')) {
          this.MenuPages = [
            this.driverPage,
            this.profilePage,
            this.dashboardPage
          ];
        } else {
          this.MenuPages = [
            this.passengerPage,
            this.allTripsPage,
            this.profilePage,
            this.dashboardPage
          ];
        }
      }
    });
  }

  openPage(page) {
    if (this.rootPage.name === page.component.name) {
      this.nav.goToRoot();
    } else {
      this.rootPage = page.component;
    }
  }

  logout(){
    // this.push.unregister();
    this.auth.logout();
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    } else {

      console.log('initPushNotification');

      if (this.deviceTokenforPushRegistration !== undefined) {
        let profileObservable = this.af.database.object("/users/" + this.auth.uid );
          profileObservable.update({pushToken: this.deviceTokenforPushRegistration});
      }

      this.pushObject.on('notification').subscribe((data: any) => {
        console.log('data', data);
        console.log('message', data.message);
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //TODO: Your logic here
                // this.nav.push(DetailsPage, {message: data.message});
              }
            }]
          });
          confirmAlert.present();
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly
          // this.nav.push(DetailsPage, {message: data.message});
          console.log("Push notification clicked");
        }
      });
      this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
