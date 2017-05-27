import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Platform, Nav, AlertController,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { DriverPage } from '../pages/driver/driver';
import { MyTripsPage } from '../pages/my-trips/my-trips';
import { ProfilePage } from '../pages/profile/profile';

import { PassengerPage } from '../pages/passenger/passenger';
import { AllTripsPage } from '../pages/all-trips/all-trips';
import { ChatComponent } from '../chats/chat.component';
import { Auth } from '../providers/auth';

import { Subscription } from 'rxjs/Subscription';

import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { AngularFire } from 'angularfire2';

export interface Page {
  [id: string]: { [title:string]:any};
}

export const ALL_PAGES = {
  driver: { title: 'New Trip', component: DriverPage },
  profile: { title: 'Profile', component: ProfilePage },
  myTrips: { title: 'My Trips', component: MyTripsPage },
  passenger: { title: 'New Trip', component: PassengerPage },
  allTrips: { title: 'All Driver Trip', component: AllTripsPage },
  chat: { title: 'Chats', component: ChatComponent },

}


@Component({
  templateUrl: './app.component.html'
})
export class MyApp implements OnDestroy {
  // Vars
  rootPage = LoginPage;
  @ViewChild(Nav) nav: Nav;
  activeMenu: Page;

  loginSubscription: Subscription;
  MenuPages: Array<any> = [];

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

  pushObject: PushObject;
  deviceTokenforPushRegistration: string;

  constructor(public platform: Platform,
    public auth: Auth,
    public push: Push,
    private alertCtrl: AlertController,
    private af: AngularFire,
    private events: Events
    // private navCtrl: NavController
  ) {

    this.auth = auth;
    this.rootPage = LoginPage;

    this.events.subscribe('page-changed',(data)=>{
      this.activeMenu = data;
    });

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

    this.loginSubscription = this.auth.stateChangeEvent.subscribe((value: String) => {
      if (value.includes('login') || (value.includes('profile-updated'))) {
        this.initPushNotification();
        if (value.includes('driver')) {
          this.MenuPages = [
            ALL_PAGES.driver,
            ALL_PAGES.profile,
            ALL_PAGES.myTrips
          ];
        } else {
          this.MenuPages = [
            ALL_PAGES.passenger,
            ALL_PAGES.allTrips,
            ALL_PAGES.profile,
            ALL_PAGES.myTrips
          ];
        }

        this.MenuPages.push(ALL_PAGES.chat);
      }
    });
  }

  openPage(page: Page) {
    this.activeMenu = page;
    this.nav.setRoot(page.component);
  }

  checkActiveMenu(page: Page): boolean {
    if (!this.activeMenu) {
      return false;
    }
    return this.activeMenu.title == page.title;
  }

  logout() {
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
        let profileObservable = this.af.database.object("/users/" + this.auth.uid);
        profileObservable.update({ pushToken: this.deviceTokenforPushRegistration });
      }

      this.pushObject.on('notification').subscribe((data: any) => {
        console.log('data', data);
        console.log('message', data.message);
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          let confirmAlert = this.alertCtrl.create({
            title: 'SpareSeat Notification',
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
