import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { getLatLngObject } from '../../app-lib/utilities';

// Note first check if the map location is getting the location near by.



@Component({
  selector: 'page-trip-map',
  templateUrl: 'trip-map.html'
})
export class TripMapPage implements OnInit {
  tripObject: any;
  origin: any;
  destination: any;
  waypoints: [{
    lat:
    19.1490645,
    lng:
    72.85357879999992
  }]
  constructor(public navCtrl: NavController, public _navParams: NavParams) { }

  ngOnInit() {
    this.tripObject = this._navParams.get('trip');
    this.origin = getLatLngObject(this.tripObject.startLocation);
    this.destination = getLatLngObject(this.tripObject.endLocation);
    console.log(this.origin, this.destination);
  }



  ionViewDidLoad() {
    console.log('Hello TripMapPage Page');
  }

}
