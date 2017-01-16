import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

//types
import { TripTypeEnum, TripObjectInterface, USERTYPES, appName } from '../../app-types/app-types';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';
import { Dashboard } from '../dashboard/dashboard';
import { ErrorHandler } from '../../providers/errorhandler';
import { tripRawToDbObject, toISOStringWithTZ } from '../../app-lib/utilities';

// import {GroupBy} from '../../pipes/group-by';

@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
  providers: [GoogleMapsAPIWrapper],
})
export class DriverPage {
  // Vars
  appTitle :string = appName;
  startTripLocation: any;
  endTripLocation: any;
  tripType: TripTypeEnum = TripTypeEnum.OneWay;
  allTripType = TripTypeEnum;
  currentTime: string = toISOStringWithTZ(new Date());
  maxTimeAccepted: string = toISOStringWithTZ(new Date(Date.now() + 3600 * 1000 * 24 * 60));
  endMaxTimeAccepted: string = this.maxTimeAccepted;
  dummyStartTime: number = 0;
  dummyEndTime: number = 0;
  canSubmit: boolean = true;

  trip: TripObjectInterface;

  driverTrips: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public gApi: GoogleMapsAPIWrapper,
    public gLoader: MapsAPILoader,
    private toastCtrl: ToastController,
    private af: AngularFire,
    private eh: ErrorHandler
  ) {
    this.driverTrips = af.database.list("/trips/" + af.auth.getAuth().uid + "/driver");

    // View already existing trip
    this.trip = params.get('trip');

    if (this.trip) {
      this.canSubmit = false;
      this.startTripLocation = this.trip.startLocation.formatted_address;
      this.endTripLocation = this.trip.endLocation.formatted_address;
      this.initAddressAutoComplete();
    } else {
      // new trip
      this.trip = { userType: USERTYPES.driver.name } ;
    }
  }

  ionViewDidLoad() {
    // setup GoogleMaps, Trip type
    this.trip.type = TripTypeEnum.OneWay;
    this.initAddressAutoComplete();
  }

  changeMaxTime(ev): void {
    let twoDigit = (v) => (v >= 10) ? v : `0${v}`;
    let { year: {value: Y}, month: {value: M}, day: {value: D}, hour: {value: H}, minute: {value: m} } = ev;
    // Note: format for the dateTime matters and following is the valid value. yyyy-mm-ddThh:min:secZ
    // Note: There is a bug with the input datatime as it doesnot respect the min value for the Hour and minute.
    this.endMaxTimeAccepted = `${Y}-${twoDigit(M + 2)}-${twoDigit(D)}T${twoDigit(H)}:${twoDigit(m)}:00Z`;
  }

  initAddressAutoComplete(): void {
    this.gLoader.load().then(() => {
      let startLocation = new google.maps.places.Autocomplete(document.getElementById("startLocation"), {});
      let endLocation = new google.maps.places.Autocomplete(document.getElementById("endLocation"), {});

      google.maps.event.addListener(startLocation, 'place_changed', () => {
        console.log(startLocation.getPlace());
        this.trip.startLocation = startLocation.getPlace().geometry;
        this.trip.startLocation.formatted_address = startLocation.getPlace().formatted_address;
        this.trip.startLocation.name = startLocation.getPlace().name;
      });

      google.maps.event.addListener(endLocation, 'place_changed', () => {
        console.log(endLocation.getPlace());
        this.trip.endLocation = endLocation.getPlace().geometry;
        this.trip.endLocation.formatted_address = endLocation.getPlace().formatted_address;
        this.trip.endLocation.name = endLocation.getPlace().name;
      });
    });
  }

  _areDatesValid(): boolean {
    this.dummyStartTime = (this.trip.startTime) ? +new Date(this.trip.startTime) : 0;
    if (this.dummyStartTime) {
      this.dummyEndTime = + new Date(this.trip.endTime);
      return this.dummyEndTime > this.dummyStartTime;
    }
    return true;
  }

  tripDatesOk(): boolean {
    if (!this._areDatesValid()) {
      this.showDateCorrectionToast();
      return false;
    }
    return true;
  }

  showDateCorrectionToast(): void {
    let toast = this.toastCtrl.create({
      message: 'Please correct Trip End Time.',
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  submitTripForm(ev: Event, tripFrom): void {
    ev.preventDefault();

    if (tripFrom.valid && this.tripDatesOk()) {
      //check if dates are valid
      let myDbOBject = tripRawToDbObject(this.trip);
      this.driverTrips.push(myDbOBject)
        .then(() =>
          this.navCtrl.push(Dashboard, {
            trip: this.trip
          })
        ).catch(this.eh.handle);
    }
  }
}
