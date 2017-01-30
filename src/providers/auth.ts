import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

import * as firebase from 'firebase';

import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire, FirebaseObjectObservable} from 'angularfire2';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Subject } from 'rxjs/Subject';


@Injectable()
export class Auth {

  private authState: FirebaseAuthState = null;
  // login and logout
  public stateChangeEvent = new Subject();

  constructor(public http: Http,
    public auth$: AngularFireAuth,
    private af: AngularFire,
    private platform: Platform) {
      auth$.subscribe((state: FirebaseAuthState) => {
        console.log('state', state);
        this.authState = state;
        if(state) {
          console.log('login event sent');
          this.stateChangeEvent.next('login');
        } else {
          console.log('logged out', state);
          this.stateChangeEvent.next('logout');
        }
      });
  }

  get uid():String {
    return String(this.authState.uid);
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get displayName():String {
    return this.authState && ( this.authState.auth && this.authState.auth.displayName);
  }

  loginWithFacebook(){
    this.signinWithFacebook()
    .then((authFacebookData) => this.saveUserData(authFacebookData));
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

  logout(): Promise<any> {
    this.authState = null;
    return this.auth$.logout();
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
}
