import { Component, OnInit, AfterViewInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

declare var google: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [GoogleMapsAPIWrapper]
})

export class AboutPage implements AfterViewInit{

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor(public gApi: GoogleMapsAPIWrapper,
    private _loader: MapsAPILoader,
    private nav: NavController) {

  }

  ngAfterViewInit() {
    this.autocomplete();
  }

  autocomplete() {
    this._loader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById("address"), {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace();
        console.log(place);
      });
    });
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    console.log(GoogleMapsAPIWrapper);
    console.log(this.gApi);
    // Note: to create google places Autocomplete this is one way to do this.
    // var address = document.getElementById('address');
    // console.log(new google.maps.places.Autocomplete(address));
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

  latA = this.markers[0].lat;
  lngA = this.markers[0].lng;
  latB = this.markers[1].lat;
  lngB = this.markers[1].lng;

}





