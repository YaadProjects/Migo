import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {
  AngularFire, AuthMethods, AuthProviders,
  FirebaseObjectObservable, FirebaseRef
} from 'angularfire2';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class Auth {

  constructor(public http: Http,
    @Inject(FirebaseRef) private firebase,
    public af: AngularFire) {
  }

  getAuth() {
    return this.af.auth;
  }

  loginWithFacebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
      .then((authFacebookData) => this.saveUserData(authFacebookData))
      .catch(e => this.loginError(e));
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
      .then((authGoogleData) => this.saveUserData(authGoogleData))
      .catch(e => this.loginError(e));

  }

  logout(): void {
    this.af.auth.logout();
  }

  saveUserData(authData) {
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

  loginError(error) {
    let auth = this.firebase.auth();
    if (error.code === 'auth/account-exists-with-different-credential') {
      let {email, credential} = error;
      auth
        .fetchProvidersForEmail(email)
        .then(providers => {
          let [providerName] = providers;
          let providerObjet = Auth.getProviderObject(providerName);

          auth.signInWithPopup(providerObjet)
            .then(result => {
              result.user.link(credential).then(function (message) {
              });
            })
        });
      return error;
    }
    console.error('Login Error:', error);
  }

  static getProviderObject(providerName) {
    switch (providerName) {
      case 'google.com':
        return new firebase.auth.GoogleAuthProvider;
      case 'facebook.com':
        return new firebase.auth.FacebookAuthProvider;
    }
  }

}
