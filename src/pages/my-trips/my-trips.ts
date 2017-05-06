import {Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { APP_NAME } from '../../app-types/app-types';
import { DriverPage } from '../driver/driver';
import { PassengerPage } from '../passenger/passenger';

import { Auth } from '../../providers/auth';

import { Subscription } from 'rxjs/Subscription';

import { TripStatusEnum } from '../../app-types/app-types';

@Component({
  selector: 'page-my-trips',
  templateUrl: 'my-trips.html',
})
export class MyTripsPage implements OnInit, OnDestroy {
  appTitle :string = APP_NAME;
  userTrips: FirebaseListObservable<any>;
  userType: String;
  userSubscription: Subscription;

  constructor(
    private af: AngularFire,
    public auth: Auth,
    public navCtrl: NavController,
    public menu: MenuController
  ) {
    this.menu.swipeEnable(false);
  }

  takeToDriverOrPassengerPage(tripObj) {
    // this.navCtrl.remove(0);
    if (this.userType === 'driver') {
      // this.navCtrl.remove(0);
      this.navCtrl.setRoot(DriverPage, {trip: tripObj});
    } else {
      this.navCtrl.setRoot(PassengerPage, {trip: tripObj});
    }
  }

  displayDay(date){
    return new Date(date.replace(/-/g, '/')).toDateString();
  }

  directToDriverPage() {
    this.navCtrl.push(DriverPage);
  }

  ngOnInit () {
    let user = this.af.database.object("/users/" + this.auth.uid);
    this.userSubscription = user.subscribe((user) => {
      this.userType = user.userType;
      this.userTrips = this.af.database.list("/trips/" + this.auth.uid + '/' + this.userType);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  tripStatusWithColor(trip) {
    let statusWithButtonColor;
    if (trip.status === TripStatusEnum.Requested) {
      statusWithButtonColor = { status: 'Requested', color: 'primary'};
    } else if (trip.status === TripStatusEnum.PendingConfirmation) {
      statusWithButtonColor = { status: 'Pending', color: 'dark'};
    // } else if (trip.status === TripStatusEnum.Rejected) {
    //   statusWithButtonColor = { status: 'Rejected', color: 'danger'};
    } else if (trip.status === TripStatusEnum.Completed) {
      statusWithButtonColor = { status: 'Completed', color: 'secondary'};
    } else if (trip.status === TripStatusEnum.Cancelled) {
      statusWithButtonColor = { status: 'Cancelled', color: 'dark'};
    }
    return statusWithButtonColor;
  }

}
