import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';

import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from 'ionic-native';
import * as firebase from 'firebase';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire, FirebaseObjectObservable} from 'angularfire2';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class Auth implements OnDestroy {

  private authState: FirebaseAuthState = null;
  // login and logout
  public stateChangeEvent = new Subject();
  private authSubscription:Subscription;

  constructor(public http: Http,
    public auth$: AngularFireAuth,
    private af: AngularFire,
    private platform: Platform) {
      this.authSubscription = auth$.subscribe((state: FirebaseAuthState) => {
        this.authState = state;
        if(!state) {
          // console.log('logged out', state);
          this.stateChangeEvent.next('logout');
        } else {
          this.fetchUserData(state);
        }
      });
  }

  ngOnDestroy() {
   this.authSubscription.unsubscribe();
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
    .then((authFacebookData) => this.fetchUserData(authFacebookData));
  }

  signinWithFacebook(): firebase.Promise<void | FirebaseAuthState | FacebookLoginResponse> {
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
    //this.authState = null;
    // this.stateChangeEvent.unsubscribe();
    this.stateChangeEvent.next('logout');
    return this.auth$.logout();
  }

  fetchUserData(authData) {
    let uid, displayName, email, providerData;

    console.log('authData', authData);

    if (this.platform.is('cordova')) {
      uid = authData.uid;
      if (authData.displayName) {
        displayName = authData.displayName;
        email = authData.email;
        providerData = authData.providerData[0];
      } else {
        displayName = authData.auth.displayName;
        email = authData.auth.email;
        providerData = authData.auth.providerData[0];
      }
    } else {
      uid = authData.uid,
      displayName = authData.auth.providerData[0].displayName,
      email = authData.auth.providerData[0].email,
      providerData = authData.auth.providerData[0];
    }
    const userObject = {uid,displayName,email,providerData};
    this.getUserFromUidAndSendEvent(userObject);
  }

  private getUserFromUidAndSendEvent(userObject):void{
    let {uid} = userObject;
    let userObj: FirebaseObjectObservable<any> = this.af.database.object(`users/${uid}`);
    let userType:string;
    userObj
      .take(1)
      .subscribe(userData => {
        if (userData.$exists()) {
          userType = userData.userType;
          console.log('User loggedin successfully');
        } else {
          userObj.set(userObject)
          .then(user => {
            console.log('User created successfully');
          });
        }
        this.stateChangeEvent.next('login' + ':' + userType);
      });
  }
}
