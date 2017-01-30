import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { appName } from '../../app-types/app-types';

import { DriverPage } from '../driver/driver';
import { LoginPage } from '../login/login';
import { PassengerPage } from '../passenger/passenger';

import { Dashboard } from '../dashboard/dashboard';

import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage {
  // variables
  appTitle: string = appName;

  constructor(
    private navCtrl: NavController,
    private auth: Auth,
    private modalCrl: ModalController
    ) {}

  get displayName(){
    return this.auth.displayName;
  }

  loginModal() {
    let loginModal = this.modalCrl.create(LoginPage, {}, { enableBackdropDismiss: false, showBackdrop: true });
    loginModal.present();
  }

  goToDriver() {
    this.navCtrl.push(DriverPage);
  }

  goToPassenger() {
    this.navCtrl.push(PassengerPage);
  }

  goToDashboard() {
    this.navCtrl.push(Dashboard);
  }

  logout(): void {
    this.auth.logout().then(() => { console.log('logout'); this.loginModal(); }, (error) => {console.log(error);});
  }
}
