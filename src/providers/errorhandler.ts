import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandler{

  constructor(public ac: AlertController) {}

  handle() {
    let alert = this.ac.create({
      title: 'Error',
      message: 'Something bad happened! Please try after sometime. We have notified the team.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
