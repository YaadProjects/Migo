import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { appName } from '../../app-types/app-types';
import { DriverPage } from '../driver/driver';

import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
  appTitle :string = appName;
  tripsAsDriver: FirebaseListObservable<any>;
  // tripsAsPassenger: FirebaseListObservable<any>;

  constructor(
    private af: AngularFire,
    private auth: Auth,
    public navCtrl: NavController,
  ) {
      this.tripsAsDriver = af.database.list("/trips/" + auth.uid + "/driver");
  }

  takeToDriverPage(tripObj) {
    this.navCtrl.push(DriverPage, {trip: tripObj});
  }

  displayDay(date){
    return new Date(date.replace(/-/g, '/')).toDateString();
  }

}
