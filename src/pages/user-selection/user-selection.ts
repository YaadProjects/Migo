import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { User, UserService } from '../../providers/user';

import { DriverPage } from '../driver/driver';
import { LoginPage } from '../login/login';
import { PassengerPage } from '../passenger/passenger';
import { Auth } from '../../providers/auth';

// import 'rx/add'

/*
  Generated class for the UserSelection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage implements OnInit, AfterViewInit, AfterViewChecked {
  appTitle: string = 'ProjectX';
  user: User;
  constructor(public navCtrl: NavController,
    public auth: Auth,
    public modalCrl: ModalController,
    public userService: UserService) {

  }

  ngOnInit() {
    //this.getUser();
    this.auth.getAuth().subscribe(auth => {
      if (!auth) {
        let loginModal = this.modalCrl.create(LoginPage, {}, { enableBackdropDismiss: false, showBackdrop: true });
        loginModal.present();
      }
    });
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

  logout(): void {
    this.auth.logout();
  }

  getUser() {
    this.userService.getUser().then(user => {
      console.log("controller", user);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ::: Hello UserSelectionPage Page');
  }

}
