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
    public navCtrl: NavController,
    public auth: Auth,
    public modalCrl: ModalController
    ) {
      if (!auth.authenticated){
        this.loginModal();
      }
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
    this.auth.logout();
    this.loginModal();
  }
}
