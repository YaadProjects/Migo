import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Platform , Nav, NavController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { DriverPage } from '../pages/driver/driver';
import { MyTripsPage } from '../pages/my-trips/my-trips';
import { ProfilePage } from '../pages/profile/profile';

import { PassengerPage } from '../pages/passenger/passenger';
import { AllTripsPage } from '../pages/all-trips/all-trips';

import {Auth} from '../providers/auth';

import { Subscription } from 'rxjs/Subscription';

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

  constructor(platform: Platform,
              public auth: Auth,
              // private navCtrl: NavController
              ) {

    this.auth = auth;
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.loginSubscription = this.auth.stateChangeEvent.subscribe((value:String) => {
      if (value.includes('login')) {
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
    // this.nav.push(LoginPage);
    this.auth.logout();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
