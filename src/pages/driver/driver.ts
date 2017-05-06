import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, MenuController } from 'ionic-angular';

//types
import { TripTypeEnum, TripObjectInterface, USERTYPES, APP_NAME } from '../../app-types/app-types';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MyTripsPage } from '../my-trips/my-trips';
import { ErrorHandler } from '../../providers/errorhandler';
import { tripRawToDbObject } from '../../app-lib/utilities';
import { Auth } from '../../providers/auth';

import * as firebase from 'firebase';

@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {
  // Vars
  appTitle :string = APP_NAME;
  tripType: TripTypeEnum = TripTypeEnum.OneWay;
  allTripType = TripTypeEnum;
  canSubmit:boolean = true;
  trip: TripObjectInterface;
  userType = USERTYPES.driver.name;
  driverTrips: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private toastCtrl: ToastController,
    private af: AngularFire,
    private eh: ErrorHandler,
    private auth: Auth,
    private menu: MenuController
  ) {
      this.menu.swipeEnable(false);

      this.driverTrips = af.database.list("/trips/" + auth.uid + "/driver");
      // View already existing trip
      this.trip = params.get('trip');
    }

    createTrip(trip){
      this.trip = trip;
      this.trip.createdAt = firebase.database.ServerValue.TIMESTAMP;
      this.trip.authId = this.auth.uid;
      let myDbOBject = tripRawToDbObject(this.trip);
      this.driverTrips.push(myDbOBject)
        .then(() => {
          this.navCtrl.remove(0);
          this.navCtrl.push(MyTripsPage, {
            trip: this.trip
          });
        })
        .catch(this.eh.handle);
    }

}
