import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import 'rxjs/add/operator/map';


@Injectable()
export class Auth {

  constructor(public http: Http, public af: AngularFire) {

  }

  getAuth() {
    return this.af.auth;
  }

  loginWithFacebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  }



}
