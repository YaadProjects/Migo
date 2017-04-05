import { Component, OnDestroy } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Subscription } from 'rxjs/Subscription';
import { TripStatusEnum } from '../../app-types/app-types';

import { MyTripsPage } from '../my-trips/my-trips';

@Component({
  selector: 'page-passenger-trip-confirm',
  templateUrl: 'passenger-trip-confirm.html',
})
export class PassengerTripConfirmPage implements OnDestroy {
  private driverTrip:any;
  private passengerTrip:any;
  private passengerTripObservable: FirebaseListObservable<any>;
  private allDriverTripObs: FirebaseListObservable<any>;
  private passengerTripSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    public params: NavParams,
    public auth: Auth,
    public af: AngularFire
    ) {
      this.menu.swipeEnable(false);

      // this.driverTrip = this.params.get('trip');

      this.allDriverTripObs = this.af.database.list('trips' + '/' +  this.params.get('trip').authId + '/driver', {
        query: {
          orderByChild: 'status',
          equalTo: TripStatusEnum.Requested
        }
      });

      this.allDriverTripObs.subscribe((response) => {
        console.log('response', response);
        this.driverTrip = response.filter((tripElement) => {
          console.log('tripElement', tripElement);
          return tripElement.startLocation.formatted_address === this.params.get('trip').startLocation.formatted_address;
        })[0];
      });

      this.passengerTripObservable = this.af.database.list('trips/' + this.auth.uid + '/passenger', {
        query: {
          orderByChild: 'status',
          equalTo: TripStatusEnum.Requested,
        }
      });

      this.passengerTripSubscription = this.passengerTripObservable.subscribe((response) => {
        console.log('passengerTrip', this.passengerTrip);
        this.passengerTrip = response && response.length > 0 && response[0];
        console.log('passengerTrip', this.passengerTrip);
      });
    }

  displayDay(date){
    return new Date(date.replace(/-/g, '/')).toDateString();
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
      console.log('driverTrip', this.driverTrip);
      console.log('passengerTrip', this.passengerTrip);
      this.passengerTripObservable.update(this.passengerTrip, {status: TripStatusEnum.PendingConfirmation});
      this.allDriverTripObs.update(this.driverTrip, {status: TripStatusEnum.PendingConfirmation});

      this.navCtrl.push(MyTripsPage);
    }

    ngOnDestroy() {
      this.passengerTripSubscription.unsubscribe();
      // this.allDriverTripObs.un
    }
}
