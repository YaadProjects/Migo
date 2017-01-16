import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AngularFireModule } from 'angularfire2';

//directive and components
import { DirectionsMapDirective } from '../components/sebm-google-map-directions/sebm-google-map-directions';

//pages
import { MyApp } from './app.component';

import { UserSelectionPage } from '../pages/user-selection/user-selection';
import { DriverPage } from '../pages/driver/driver';
import { PassengerPage } from '../pages/passenger/passenger';
import { TripMapPage } from '../pages/trip-map/trip-map';
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';

//services
import { UserService } from '../providers/user';
import { ErrorHandler } from '../providers/errorhandler';
import { Auth } from '../providers/auth';

// pipes

import {GroupBy} from '../pipes/group-by';

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
  UserSelectionPage,
  DriverPage,
  PassengerPage,
  TripMapPage,
  LoginPage,
  Dashboard
];

@NgModule({
  declarations: [
    ...commonPages,
    DirectionsMapDirective,
    GroupBy
  ],

  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDfKLDQPQgpVU7wokCKnUgJVEB8vcwmd3g', libraries: ['places', 'geometry'],
      apiKey: 'AIzaSyCIfjMlujO_biUyNWlFETGg7XK7z8EBRjE', libraries: ['places', 'geometry'],
      region: 'USA'
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
