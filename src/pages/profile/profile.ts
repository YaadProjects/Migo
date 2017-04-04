import { Component, OnDestroy} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { appName, USERTYPES } from '../../app-types/app-types';

import { MyTripsPage } from '../my-trips/my-trips';
import { PassengerPage } from '../passenger/passenger';

import { Auth } from '../../providers/auth';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnDestroy {
  // variables
  appTitle: string = appName;
  profileObservable: FirebaseObjectObservable<any>;
  selectedUserType: any;
  userTypes: any;
  isExistingUser:boolean;
  selectDisabled:boolean;
  profileSubscription:Subscription;

  constructor(
    private navCtrl: NavController,
    private af: AngularFire,
    private auth: Auth,
    private menu: MenuController
    ) {
      // User should be able to see the side menu ( swipe ) if he has already set-up his profile
      this.menu.swipeEnable(false);

      this.userTypes = USERTYPES;
      this.profileObservable = af.database.object("/users/" + auth.uid );

      this.profileSubscription = this.profileObservable.subscribe((value) => {
        if (value.userType){
          this.menu.swipeEnable(true);
          this.selectedUserType = this.userTypes[value.userType]
          this.isExistingUser = true;
          this.selectDisabled = true;
        }
      })
    }

    submit(ev: Event, profileForm) {
      if (profileForm.valid) {
        this.profileObservable.update({userType: this.selectedUserType.name}).then(() => {
          if (this.selectedUserType === this.userTypes['driver']) {
            this.navCtrl.push(MyTripsPage);
          } else {
            this.navCtrl.push(PassengerPage);
          }
        });
      }
    }

    ngOnDestroy() {
      this.profileSubscription.unsubscribe();
    }
}
