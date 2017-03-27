import { Component, OnDestroy} from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { appName, USERTYPES } from '../../app-types/app-types';

import { MyTripsPage } from '../dashboard/dashboard';

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
  selectDisabled:boolean;
  profileSubscription:Subscription;

  constructor(
    private navCtrl: NavController,
    private af: AngularFire,
    private auth: Auth
    ) {
      this.userTypes = USERTYPES;
      this.profileObservable = af.database.object("/users/" + auth.uid );

      this.profileSubscription = this.profileObservable.subscribe((value) => {
        if (value.userType){
          this.selectedUserType = this.userTypes[value.userType]
          this.selectDisabled = true;
        }
      })
    }

    submit(ev: Event, profileForm) {
      if (profileForm.valid) {
        this.profileObservable.update({userType: this.selectedUserType.name}).then(() => {
          this.navCtrl.push(MyTripsPage);
        });
      }
    }

    ngOnDestroy() {
      this.profileSubscription.unsubscribe();
    }
}
