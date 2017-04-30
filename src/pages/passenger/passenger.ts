import { Component, ElementRef } from '@angular/core';
import { NavController, ToastController, NavParams, MenuController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';

//types
import { TripTypeEnum, TripObjectInterface, USERTYPES, APP_NAME, TripStatusEnum } from '../../app-types/app-types';

import { ErrorHandler } from '../../providers/errorhandler';
import { tripRawToDbObject, toISOStringWithTZ } from '../../app-lib/utilities';

import { Auth } from '../../providers/auth';
import { AllTripsPage } from '../all-trips/all-trips';

@Component({
  selector: 'page-passenger',
  templateUrl: 'passenger.html'
})
export class PassengerPage {
  appTitle: string = APP_NAME;
  allTripType = TripTypeEnum;
  userType: string = USERTYPES.passenger.name;
  tripType: TripTypeEnum = TripTypeEnum.OneWay;

  trip: TripObjectInterface = {
    userType: USERTYPES.passenger.name,
    status: TripStatusEnum.Requested
  };
  passengerTrips: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public eh: ErrorHandler,
    private toastCtrl: ToastController,
    private auth: Auth,
    public params: NavParams,
    public menu: MenuController,
    private el: ElementRef) {

    this.menu.swipeEnable(false);
    this.passengerTrips = af.database.list("/trips/" + auth.uid + "/passenger");
    // View already existing trip
    this.trip = params.get('trip');
    this.trip = {
      userType: USERTYPES.passenger.name,
      type: TripTypeEnum.OneWay,
      status: TripStatusEnum.Requested
    }

  }



  createTrip(trip): void {
    this.trip = trip;
    this.trip.createdAt = firebase.database.ServerValue.TIMESTAMP;
    let myDbOBject = tripRawToDbObject(this.trip);
    this.passengerTrips.push(myDbOBject)
      .then(() =>
        this.navCtrl.push(AllTripsPage)
      ).catch(this.eh.handle);
  }

}
