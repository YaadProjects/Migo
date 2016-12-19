import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';

//directive and components

import { DirectionsMapDirective } from '../components/sebm-google-map-directions/sebm-google-map-directions';

//pages
import { UserSelectionPage } from '../pages/user-selection/user-selection';
import { DriverPage } from '../pages/driver/driver';
import { PassengerPage } from '../pages/passenger/passenger';
import { TripMapPage } from '../pages/trip-map/trip-map';
import { LoginPage } from '../pages/login/login';

//services
import { UserService } from '../providers/user';
import { ErrorHandler } from '../providers/errorhandler';
import { Auth } from '../providers/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyAM62vxsf8Vr1pdZfJdmcK-ZGMjq9l3tHk",
  authDomain: "spareseat-150405.firebaseapp.com",
  databaseURL: "https://spareseat-150405.firebaseio.com",
  storageBucket: "spareseat-150405.appspot.com",
  messagingSenderId: "518038683899"
};

// create commonArray for the declarations and entryComponents
const commonPages = [
  MyApp,
  UserSelectionPage,
  DriverPage,
  PassengerPage,
  TripMapPage,
  LoginPage
];


@NgModule({
  declarations: [
    ...commonPages,
    DirectionsMapDirective
  ],

  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfKLDQPQgpVU7wokCKnUgJVEB8vcwmd3g', libraries: ['places', 'geometry'],
      region: 'IN'
    }),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...commonPages
  ],
  providers: [
    UserService,
    Auth,
    ErrorHandler
  ]
})
export class AppModule { }
