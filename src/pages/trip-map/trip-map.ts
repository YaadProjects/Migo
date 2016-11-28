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

  constructor(public navCtrl: NavController, public _navParams: NavParams) {}

  ngOnInit() {
    console.log(this._navParams.get('trip'));
  }

  ionViewDidLoad() {
    console.log('Hello TripMapPage Page');
  }

}
