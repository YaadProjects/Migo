import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
// import { IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AngularFireModule } from 'angularfire2';
import {ChatModule} from "../chats/chat.module";

//directive and components
// import { DirectionsMapDirective } from '../components/sebm-google-map-directions/sebm-google-map-directions';
import { DestinationMapDirective } from '../components/sebm-google-map-destination/sebm-google-map-destination';
import { NewTripFormModule } from "../components/new-trip-form/new-trip-form.module";
//pages
import { MyApp } from './app.component';

import { DriverPage } from '../pages/driver/driver';
import { PassengerPage } from '../pages/passenger/passenger';
import { LoginPage } from '../pages/login/login';
import { MyTripsPage } from '../pages/my-trips/my-trips';
import { ProfilePage } from '../pages/profile/profile';
import { AllTripsPage } from '../pages/all-trips/all-trips';
import { PassengerTripConfirmPage } from '../pages/passenger-trip-confirm/passenger-trip-confirm';
import { PassengerTab } from '../pages/passenger-tab/passenger-tab';

import { DriverTripConfirmPage } from '../pages/driver-trip-confirm/driver-trip-confirm';

//services
import { ErrorHandler } from '../providers/errorhandler';
import { Auth } from '../providers/auth';

// pipes

import { GroupBy } from '../pipes/group-by';

import {Push} from "@ionic-native/push";

// Push Notification through ionic.io
// import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '57eddd56'
//   },
//   'push': {
//     'sender_id': '166754869050',
//     'pluginConfig': {
//       'ios': {
//         'badge': true,
//         'sound': true
//       },
//       'android': {
//         'iconColor': '#343434'
//       }
//     }
//   }
// };

// export const firebaseConfig = {
//   apiKey: "AIzaSyAM62vxsf8Vr1pdZfJdmcK-ZGMjq9l3tHk",
//   authDomain: "spareseat-150405.firebaseapp.com",
//   databaseURL: "https://spareseat-150405.firebaseio.com",
//   storageBucket: "spareseat-150405.appspot.com",
//   messagingSenderId: "518038683899"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyCXAnwj58lqrExBnw2-vDbnBTTnw6WFwhg",
  authDomain: "spareseat-147111.firebaseapp.com",
  databaseURL: "https://spareseat-147111.firebaseio.com",
  storageBucket: "spareseat-147111.appspot.com",
  messagingSenderId: "166754869050"
};

// create commonArray for the declarations and entryComponents
const commonPages = [
  MyApp,
  DriverPage,
  PassengerPage,
  LoginPage,
  MyTripsPage,
  ProfilePage,
  AllTripsPage,
  PassengerTripConfirmPage,
  PassengerTab,
  DriverTripConfirmPage,
];

// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': 'e8f28bb7'
//   }
// };

@NgModule({
  declarations: [
    ...commonPages,
    // DirectionsMapDirective,
    DestinationMapDirective,
    //NewTripForm,
    GroupBy
  ],

  imports: [
    BrowserModule,
    HttpModule,
    NewTripFormModule,
    IonicModule.forRoot(MyApp,
                          {
                            tabsPlacement: 'top',
                            tabsHideOnSubPages: true,
                            platforms: {
                              android: {
                                tabsPlacement: 'top',
                                tabsHideOnSubPages: true,
                              },
                              ios: {
                                tabsPlacement: 'top',
                                tabsHideOnSubPages: true,
                              },
                              windows: {
                                tabsPlacement: 'top',
                                tabsHideOnSubPages: true,
                              }
                            }
                          }),
    FormsModule,
    ChatModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDfKLDQPQgpVU7wokCKnUgJVEB8vcwmd3g', libraries: ['places', 'geometry'],
      apiKey: 'AIzaSyCIfjMlujO_biUyNWlFETGg7XK7z8EBRjE', libraries: ['places', 'geometry'],
      region: 'USA'
    }),
    // CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...commonPages
  ],
  providers: [
    Auth,
    StatusBar,
    SplashScreen,
    ErrorHandler,
    Push,
    // PushObject
    //{provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule { }
