import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TripTypeEnum, USERTYPES, TripStatusEnum } from '../../app-types/app-types';
import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';
import { toISOStringWithTZ } from '../../app-lib/utilities';
import { ErrorHandler } from '../../providers/errorhandler';


/**
 * Generated class for the NewTripForm component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-trip-form',
  templateUrl: 'new-trip-form.html'
})
export class NewTripFormComponent {
  @Input()trip;
  @Input()userType;
  @Output() submitValidTrip = new EventEmitter<any>();

  tripType: TripTypeEnum = TripTypeEnum.OneWay;
  allTripType = TripTypeEnum;
  currentTime: string = toISOStringWithTZ(new Date());
  maxTimeAccepted: string = toISOStringWithTZ(new Date(Date.now() + 3600 * 1000 * 24 * 60));
  endMaxTimeAccepted: string = this.maxTimeAccepted;
  dummyStartTime: number = 0;
  dummyEndTime: number = 0;
  canSubmit: boolean = true;
  startTripLocation: any;
  endTripLocation: any;
  isUserDriver: boolean;

  constructor(
    public gApi: GoogleMapsAPIWrapper,
    public gLoader: MapsAPILoader,
    private toastCtrl: ToastController,
    private eh: ErrorHandler,
    private er: ElementRef
  ) {}

  ngOnInit(){
    if (this.trip) {
        this.canSubmit = false;
        this.startTripLocation = this.trip.startLocation.formatted_address;
        this.endTripLocation = this.trip.endLocation.formatted_address;
      } else {
        // new trip
        this.trip = { userType: this.userType, status: TripStatusEnum.Requested } ;
      }
  }

  ngAfterViewInit(){
    this.isUserDriver = this.userType == USERTYPES.driver.name;
    this.trip.type =  TripTypeEnum.OneWay;
    this.initAddressAutoComplete();
  }

  changeMaxTime(ev): void {
    let twoDigit = (v) => (v >= 10) ? v : `0${v}`;
    let { year: {value: Y}, month: {value: M}, day: {value: D}, hour: {value: H}, minute: {value: m} } = ev;
    // Note: format for the dateTime matters and following is the valid value. yyyy-mm-ddThh:min:secZ
    // Note: There is a bug with the input datatime as it doesnot respect the min value for the Hour and minute.
    this.endMaxTimeAccepted = `${Y}-${twoDigit(M + 2)}-${twoDigit(D)}T${twoDigit(H)}:${twoDigit(m)}:00Z`;
  }

  initAddressAutoComplete(): void {
    const pageDoc = this.er.nativeElement;
    this.gLoader.load().then(() => {
      let startLocation = new google.maps.places.Autocomplete(pageDoc.querySelector("#startLocation"), {});
      let endLocation = new google.maps.places.Autocomplete(pageDoc.querySelector("#endLocation"), {});

      google.maps.event.addListener(startLocation, 'place_changed', () => {
        //console.log(startLocation.getPlace());
        this.trip.startLocation = startLocation.getPlace().geometry;
        this.trip.startLocation.formatted_address = startLocation.getPlace().formatted_address;
        this.trip.startLocation.name = startLocation.getPlace().name;
      });

      google.maps.event.addListener(endLocation, 'place_changed', () => {
        //console.log(endLocation.getPlace());
        this.trip.endLocation = endLocation.getPlace().geometry;
        this.trip.endLocation.formatted_address = endLocation.getPlace().formatted_address;
        this.trip.endLocation.name = endLocation.getPlace().name;
      });
    });
  }

  submitTripForm(ev: Event, tripFrom): void {
    ev.preventDefault();

    if (tripFrom.valid) {
      this.submitValidTrip.emit(this.trip);
    }
  }

}
