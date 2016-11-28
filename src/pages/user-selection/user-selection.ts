import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, UserService } from '../../providers/user';
import { DriverPage } from '../driver/driver';
import { PassengerPage } from '../passenger/passenger';


/*
  Generated class for the UserSelection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage implements OnInit, AfterViewInit, AfterViewChecked{
  appTitle: string = 'ProjectX';
  user: User;
  constructor(public navCtrl: NavController, public userService: UserService) {

  }

  ngOnInit() {

    this.getUser();
   // this.userService
   //   .getUser()
  }

  goToDriver() {
    this.navCtrl.push(DriverPage);
  }

  goToPassenger() {
    this.navCtrl.push(PassengerPage);
  }

  _navigateTo() {

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {

  }

  getUser() {
    this.userService.getUser().then(user=>this.user=user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ::: Hello UserSelectionPage Page');
  }

}
