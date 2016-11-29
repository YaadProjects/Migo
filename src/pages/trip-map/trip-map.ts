import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TripMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trip-map',
  templateUrl: 'trip-map.html'
})
export class TripMapPage implements OnInit{
  tripObject: any;
  origin: any;
  destination: any;
  constructor(public navCtrl: NavController, public _navParams: NavParams) {}

  ngOnInit() {
    this.tripObject = this._navParams.get('trip');
    this.origin = this._getLatLng(this.tripObject.startLocation);
    this.destination = this._getLatLng(this.tripObject.endLocation);
    console.log(this.origin, this.destination);
  }

  _getLatLng(latLngObject) {
    return{
      lat: latLngObject.location.lat(),
      lng: latLngObject.location.lng()
    };
  }

  ionViewDidLoad() {
    console.log('Hello TripMapPage Page');
  }

}
