import { Component, ViewChild } from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { DriverPage } from '../pages/driver/driver';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';

import { PassengerPage } from '../pages/passenger/passenger';

import {Auth} from '../providers/auth';

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
export class MyApp {
  // Vars
  rootPage = LoginPage;
  @ViewChild(Nav) nav;
  driverPage = { title: 'New Trip', component : DriverPage  };
  profilePage = { title: 'Profile', component: ProfilePage };
  dashboardPage = { title: 'My Trips', component: Dashboard };
  passengerPage = { title: 'New Trip', component: PassengerPage};

  MenuPages:Array<any> = [];

  constructor(platform: Platform,
              public auth: Auth,
              ) {

    this.auth = auth;
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    auth.stateChangeEvent.subscribe((value) => {
      if (value =~ 'login') {
        if(value =~ 'driver') {
          this.MenuPages = [
            this.driverPage,
            this.profilePage,
            this.dashboardPage
          ];
        } else {
          this.MenuPages = [
            this.passengerPage,
            this.profilePage,
            this.dashboardPage
          ];
        }
      }
    });
  }

  openPage(page) {
    this.rootPage = page.component;
  }

  logout(){
    // this.nav.push(LoginPage);
    this.auth.logout();
  }
}
