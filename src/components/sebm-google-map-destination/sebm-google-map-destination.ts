import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'sebm-google-map-destination'
})
export class DestinationMapDirective implements OnInit {
  @Input() destination;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {

    this.gmapsApi.getNativeMap().then(map => {

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'address': this.destination}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        }
      });
    });
  }
}
