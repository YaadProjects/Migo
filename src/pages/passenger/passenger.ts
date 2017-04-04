import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, MenuController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

//types
import { TripTypeEnum, TripObjectInterface, USERTYPES,  appName, TripStatusEnum } from '../../app-types/app-types';

import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';
import { ErrorHandler } from '../../providers/errorhandler';
import { tripRawToDbObject, toISOStringWithTZ } from '../../app-lib/utilities';

import { Auth } from '../../providers/auth';
import { AllTripsPage } from '../all-trips/all-trips';

@Component({
  selector: 'page-passenger',
  templateUrl: 'passenger.html',
  providers: [GoogleMapsAPIWrapper],
})
export class PassengerPage {
  appTitle :string = appName;
  startTripLocation: any;
  endTripLocation: any;
  tripType: TripTypeEnum = TripTypeEnum.OneWay;
  allTripType = TripTypeEnum;
  currentTime: string = toISOStringWithTZ(new Date());
  maxTimeAccepted: string = toISOStringWithTZ(new Date(Date.now() + 3600 * 1000 * 24 * 60));
  endMaxTimeAccepted: string = this.maxTimeAccepted;
  dummyStartTime: number = 0;
  canSubmit: boolean = true;

  trip: TripObjectInterface = {
    userType: USERTYPES.passenger.name,
    status: TripStatusEnum.Requested
   };
  passengerTrips: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
    public gApi: GoogleMapsAPIWrapper,
    public gLoader: MapsAPILoader,
    public af: AngularFire,
    public eh: ErrorHandler,
    private toastCtrl: ToastController,
    private auth:Auth,
    public params: NavParams,
    public menu: MenuController
  ) {
      this.menu.swipeEnable(false);

      this.passengerTrips = af.database.list("/trips/" + auth.uid + "/passenger");
      // View already existing trip
      this.trip = params.get('trip');

      if (this.trip) {
        this.canSubmit = false;
        this.startTripLocation = this.trip.startLocation.formatted_address;
        this.endTripLocation = this.trip.endLocation.formatted_address;
        this.initAddressAutoComplete();
      } else {
        // new trip
        this.trip = {
          userType: USERTYPES.passenger.name,
          type: TripTypeEnum.OneWay,
          status: TripStatusEnum.Requested
         } ;
      }

      this.initAddressAutoComplete();
   }

  initAddressAutoComplete(): void {
    this.gLoader.load().then(() => {
      let startLocation = new google.maps.places.Autocomplete(document.getElementById("startLocation"), {});
      let endLocation = new google.maps.places.Autocomplete(document.getElementById("endLocation"), {});

      google.maps.event.addListener(startLocation, 'place_changed', () => {
        this.trip.startLocation = startLocation.getPlace().geometry;
        this.trip.startLocation.formatted_address = startLocation.getPlace().formatted_address;
        this.trip.startLocation.name = startLocation.getPlace().name;
      });

      google.maps.event.addListener(endLocation, 'place_changed', () => {
        this.trip.endLocation = endLocation.getPlace().geometry;
        this.trip.endLocation.formatted_address = endLocation.getPlace().formatted_address;
        this.trip.endLocation.name = endLocation.getPlace().name;
      });
    });
  }

  submitTripForm(ev: Event, tripFrom): void {
    ev.preventDefault();
    if (tripFrom.valid) {
      this.trip.createdAt = firebase.database.ServerValue.TIMESTAMP;
      let myDbOBject = tripRawToDbObject(this.trip);
      this.passengerTrips.push(myDbOBject)
        .then(() =>
          this.navCtrl.push(AllTripsPage)
        ).catch(this.eh.handle);
    }
  }
}
