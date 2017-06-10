import {Component, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

import { APP_NAME } from '../../app-types/app-types';
import { DriverPage } from '../driver/driver';
import { PassengerPage } from '../passenger/passenger';

import { Auth } from '../../providers/auth';

import { Subscription } from 'rxjs/Subscription';

// import { TripStatusEnum } from '../../app-types/app-types';
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/observable";

@Component({
  selector: 'page-my-trips',
  templateUrl: 'my-trips.html',
})
export class MyTripsPage implements OnInit {
  appTitle:string = APP_NAME;
  userTrips:Observable<any[]>; //typescript mistake its type is FirebaseListObservable[]
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
    if (this.userType === 'driver') {
      this.navCtrl.setRoot(DriverPage, {trip: tripObj});
    } else {
      this.navCtrl.setRoot(PassengerPage, {trip: tripObj});
    }
  }

  displayDay(date){
    var dateObjArray =  new Date(date).toDateString().split(' ', 3);
    return dateObjArray.shift() + ' ' + dateObjArray.join(' ');
  }

  directToDriverPage() {
    this.navCtrl.push(DriverPage);
  }

  ngOnInit () {
   this.userTrips =  this.af.database.object(`/users/${this.auth.uid}`)
    .switchMap((user)=> this.af.database.list(`trips/${this.auth.uid}/${user.userType}`))
  }

}
