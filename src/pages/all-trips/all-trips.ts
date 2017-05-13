import { Component, OnDestroy} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Subscription } from 'rxjs/Subscription';

import { PassengerTripConfirmPage } from '../passenger-trip-confirm/passenger-trip-confirm';
import { TripStatusEnum } from '../../app-types/app-types';
import { toISOStringWithTZ } from '../../app-lib/utilities';

@Component({
  selector: 'page-all-trips',
  templateUrl: 'all-trips.html'
})
export class AllTripsPage implements OnDestroy {
  private allDriverTripsObs:FirebaseListObservable<any>;
  private allDriverTripsSub:Subscription;
  public trips:any;

  constructor(
    private navCtrl: NavController,
    private af: AngularFire,
    private menu: MenuController,
    ) {
      this.menu.swipeEnable(false);

      this.allDriverTripsObs = af.database.list('trips', {
        query: {
          orderByChild: 'driver',
          startAt: false
        }
      });
      this.allDriverTripsSub = this.allDriverTripsObs.subscribe((response) => {
        this.trips = response.
                            map((trip) => {
                              // console.log('trip all', trip);
                              let driverArray = [];
                              let keys = Object.keys(trip.driver);
                              keys.forEach(function(key){
                                if (trip.driver[key]['status'] === TripStatusEnum.Requested
                                    && trip.driver[key]['startTime'] > toISOStringWithTZ(new Date())) {
                                  driverArray.push(trip.driver[key]);
                                }
                              });
          return driverArray;
        });
        this.trips = this.flatten(this.trips);
      })
  }

  flatten(array){
    return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatten(val) : val), []);
  }

  displayDay(date){
    return new Date(date.replace(/-/g, '/')).toDateString();
  }

  confirmTrip(trip){
    let selectedTrip = this.trips.filter((tripElem) => {
      return ((tripElem.startLocation.formatted_address === trip.startLocation.formatted_address)
              && (tripElem.authId === trip.authId)
              );
    });
    console.log('selectedTrip', selectedTrip[0]);
    this.navCtrl.push(PassengerTripConfirmPage, {trip: selectedTrip[0]});
  }

  ngOnDestroy(){
    this.allDriverTripsSub.unsubscribe();
  }
}
