import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

import * as firebase from 'firebase';

import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire, FirebaseObjectObservable} from 'angularfire2';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class Auth {

  userData:any;
  private authState: FirebaseAuthState;

  constructor(public http: Http,
    public auth$: AngularFireAuth,
    private af: AngularFire,
    private platform: Platform) {
      this.authState = auth$.getAuth();
      auth$.subscribe((state: FirebaseAuthState) => {
        this.authState = state;
      });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get displayName():String {
    return this.authState && this.authState.facebook.displayName;
  }


  loginWithFacebook(){
    this.signinWithFacebook()
    .then((authFacebookData) => this.saveUserData(authFacebookData))
  }

  signinWithFacebook(): firebase.Promise<FirebaseAuthState | FacebookLoginResponse> {
    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(function(res) {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      }, function(error){
        console.log('error', error);
      });
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      })
    }
  }

  loginWithGoogle() {
    this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  }

  logout(): void {
    this.auth$.logout();
    this.authState = null;
  }

  saveUserData(authData) {
    let {uid, displayName, email, providerData } = authData;
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
          providerData
        }).then(user => console.log('User created successfully'));
      });
  }

  // loginError(error) {
  //   let auth = this.firebase.auth();
  //   if (error.code === 'auth/account-exists-with-different-credential') {
  //     let {email, credential} = error;
  //     auth
  //       .fetchProvidersForEmail(email)
  //       .then(providers => {
  //         let [providerName] = providers;
  //         let providerObjet = Auth.getProviderObject(providerName);

  //         auth.signInWithPopup(providerObjet)
  //           .then(result => {
  //             result.user.link(credential).then(function (message) {
  //             });
  //           })
  //       });
  //     return error;
  //   }
  //   console.error('Login Error:', error);
  // }

  // static getProviderObject(providerName) {
  //   switch (providerName) {
  //     case 'google.com':
  //       return new firebase.auth.GoogleAuthProvider;
  //     case 'facebook.com':
  //       return new firebase.auth.FacebookAuthProvider;
  //   }
  // }

}
