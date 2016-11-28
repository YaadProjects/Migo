import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';

//pages

import { UserSelectionPage } from '../pages/user-selection/user-selection';
import { DriverPage } from '../pages/driver/driver';
import { PassengerPage } from '../pages/passenger/passenger';
import { TripMapPage } from '../pages/trip-map/trip-map';

//services
import { UserService } from '../providers/user';

// create commonArray for the declarations and entryComponents

const commonPages = [
  MyApp,
  UserSelectionPage,
  DriverPage,
  PassengerPage,
  TripMapPage
];


@NgModule({
  declarations: [
    ...commonPages
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfKLDQPQgpVU7wokCKnUgJVEB8vcwmd3g', libraries: ['places'],
      region: 'IN'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...commonPages
  ],
  providers: [
    UserService
  ]
})
export class AppModule { }
