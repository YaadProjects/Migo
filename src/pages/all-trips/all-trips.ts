import { Component, OnDestroy} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { APP_NAME } from '../../app-types/app-types';

import { Subscription } from 'rxjs/Subscription';

// import { PassengerTripConfirmPage } from '../passenger-trip-confirm/passenger-trip-confirm';
import { PassengerTab } from '../passenger-tab/passenger-tab';

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
  appTitle:string = APP_NAME;

  constructor(
    private navCtrl: NavController,
    private af: AngularFire,
    private menu: MenuController,
    ) {
      this.menu.swipeEnable(false);
      //let work on this logic. can be written better. in the next call, will work on this.
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
    var dateObjArray =  new Date(date).toDateString().split(' ', 3);
    return dateObjArray.shift() + ' ' + dateObjArray.join(' ');
  }

  confirmTrip(trip){
    let selectedTrip = this.trips.filter((tripElem) => {
      return ((tripElem.startLocation.formatted_address === trip.startLocation.formatted_address)
              && (tripElem.authId === trip.authId)
              );
    });
    // this.navCtrl.push(PassengerTripConfirmPage, {trip: selectedTrip[0]});
    this.navCtrl.push(PassengerTab, {trip: selectedTrip[0]});
  }

  ngOnDestroy(){
    this.allDriverTripsSub.unsubscribe();
  }
}
