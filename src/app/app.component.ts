import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserSelectionPage } from '../pages/user-selection/user-selection';

@Component({
  template: `
    <ion-nav id="nav" [root]="rootPage" #content swipeBackEnabled="false"></ion-nav> `
})
export class MyApp {
  // Vars
  rootPage = UserSelectionPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
