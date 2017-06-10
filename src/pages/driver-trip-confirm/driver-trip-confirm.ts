import { Component, OnDestroy } from '@angular/core';
import { NavController, MenuController, NavParams, LoadingController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { APP_NAME } from '../../app-types/app-types';

import { Subscription } from 'rxjs/Subscription';
import { TripStatusEnum } from '../../app-types/app-types';

import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-driver-trip-confirm',
  templateUrl: 'driver-trip-confirm.html',
})
export class DriverTripConfirmPage implements OnDestroy {
  private driverTrip:any;
  private driver:any;
  private driverTripObservable: FirebaseListObservable<any>;
  private driverSubscription:Subscription;
  appTitle: string = APP_NAME;
  private passengerTrip: any;
  private driverTripSubscription: Subscription;
  private passengerTripSubscription:Subscription;

  constructor (
    private navCtrl: NavController,
    private menu: MenuController,
    public params: NavParams,
    public auth: Auth,
    public af: AngularFire,
    public http: Http,
    private loadCtrl: LoadingController
    ){
      this.menu.swipeEnable(false);

      this.driverTripObservable = this.af.database.list('trips/' + this.auth.uid + '/driver', {
        query: {
          orderByChild: 'status',
          equalTo: TripStatusEnum.PendingConfirmation,
        }
      });

      this.driverTripSubscription = this.driverTripObservable.subscribe((response) => {

        this.driverTrip = response[0];

        this.driverSubscription = this.af.database.object( 'users/' + this.driverTrip.authId).subscribe((value) => {
          this.driver = value;
        });

        this.passengerTripSubscription = this.af.database.object('trips/'+ this.driverTrip.passengerId + '/passenger/' +
                                        this.driverTrip.passengerTripId).subscribe((value) => {
                                          this.passengerTrip = value;
                                        });
      });
  }

  displayDay(date){
    return (new Date(date)).toString();
  }

  distance() {
    let R = 6371e3; // metres
    let d = 0;

    if (this.passengerTrip) {
      let φ1 = (this.passengerTrip.startLocation.lat) * (Math.PI / 180 );
      let φ2 = (this.passengerTrip.endLocation.lat) * (Math.PI / 180 );
      let Δφ = (this.passengerTrip.endLocation.lat-this.passengerTrip.startLocation.lat) * (Math.PI / 180 );
      let Δλ = (this.passengerTrip.endLocation.lng-this.passengerTrip.startLocation.lng) * (Math.PI / 180 );

      let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      d = (R * c )/ 1609.34 ;
    }
      return d;
  }

  confirmTrip() {
    // Driver has confirmed your trip
  }

  ngOnDestroy() {
    this.driverSubscription.unsubscribe();
    this.driverTripSubscription.unsubscribe();
    this.passengerTripSubscription.unsubscribe();
  }

}
