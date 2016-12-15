import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  AngularFire, AuthMethods, AuthProviders,
  FirebaseObjectObservable,
  // AngularFireAuth
} from 'angularfire2';

import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


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
    })
      .then((authFacebookData) => this.saveFabookUserData(authFacebookData))
      .catch(e=>this.loginError(e));
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
      .then((authData) => this.saveGoogleUserData(authData))
      .catch(e => this.loginError(e));

  }

  logout(): void {
    this.af.auth.logout();
  }


  saveGoogleUserData(authData) {
    let {auth: {uid, displayName, email, providerData},
      provider } = authData;
    let userObj: FirebaseObjectObservable<any> = this.af.database.object(`users/${uid}`);
    return userObj
      .take(1)
      .subscribe(userData => {
        if (userData.$exists()) {
          return true;
        }
        userObj.set({
          uid,
          displayName,
          email,
          provider,
          providerData
        }).then(user => console.log('User created successfully'))
          .catch(e => this.loginError(e));
      });


  }

  saveFabookUserData(authData) {
    console.log(authData);
  }



  loginError(error) {

    if (error.code === 'auth/account-exists-with-different-credential') {
      // Means user has already singedIn using other method.
      // There a way to do it correctly.
      // https://firebase.google.com/docs/auth/web/google-signin#popup-mode
      // fetchProvidersForEmail is not able to execute.
      // will show the alert the user to use other login method.
      console.info("Please use other login method to login.:)");
      return error;
    }
    console.error('Login Error:',error);
  }


}
