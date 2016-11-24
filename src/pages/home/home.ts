import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';

interface Table {
  name?: string;
  description?: string;
  date?: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  table: Table = {};
  startYear: any;
  constructor(public navCtrl: NavController) {

  }

  logForm() {
    console.log(this.table);
  }

  goToMap(): void{
    this.navCtrl.push(AboutPage);
  }

}
