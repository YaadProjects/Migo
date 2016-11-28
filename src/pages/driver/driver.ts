import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';

import { TripMapPage } from '../trip-map/trip-map';


declare var google: any;
export enum TripTypeEnum {
	OneWay,
	Round
}



/*
  Generated class for the Driver page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-driver',
	templateUrl: 'driver.html',
	providers: [GoogleMapsAPIWrapper],

})
export class DriverPage {

	tripType: TripTypeEnum = TripTypeEnum.OneWay;
	allTripType = TripTypeEnum;
  currentTime: string = new Date().toISOString();
  maxTimeAccepted: string = new Date(Date.now() + 3600 * 1000 * 24 * 60).toISOString();
  endMaxTimeAccepted: string = this.maxTimeAccepted;

	trip: any = {
		type: this.tripType
	};


	constructor(public navCtrl: NavController,
		public gApi: GoogleMapsAPIWrapper,
		public gLoader: MapsAPILoader
	) { }

	ionViewDidLoad() {
		this.autocomplete();
	}

  changeMaxTime(ev) {
    let twoDigit = (v) => (v >= 10) ? v : `0${v}`;
    let { year: {value: Y}, month: {value: M}, day: {value: D}, hour: {value: H}, minute: {value:m} } = ev;
    //Note: format for the dateTime matters and following is the valid value. yyyy-mm-ddThh:min:secZ
    //Note: There is a bug with the input datatime as it doesnot respect the min value for the Hour and minute.
    this.endMaxTimeAccepted = `${Y}-${twoDigit(M + 2)}-${twoDigit(D)}T${twoDigit(H)}:${twoDigit(m)}:00Z`;
  }

	autocomplete() {
		this.gLoader.load().then(() => {
			let startLocation = new google.maps.places.Autocomplete(document.getElementById("startLocation"), {});
			let endLocation = new google.maps.places.Autocomplete(document.getElementById("endLocation"), {});
			google.maps.event.addListener(startLocation, 'place_changed', () => {
        this.trip.startLocation = startLocation.getPlace().geometry;
			});

			google.maps.event.addListener(endLocation, 'place_changed', () => {
				this.trip.endLocation = endLocation.getPlace().geometry;
			});
		});
  }

  submitTripForm(ev:Event, tripFrom) {
    ev.preventDefault();

    if (tripFrom.valid) {
      this.navCtrl.push(TripMapPage, { trip: this.trip });
    }
  }

}
