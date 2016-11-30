import { TripObjectInterface, TripObjectInDB } from '../app-types/app-types';

export let tripRawToDbObject:(input:TripObjectInterface)=>TripObjectInDB = tripObject => Object.assign({}, tripObject, {
  startLocation: {
    lat: tripObject.startLocation.location.lat(),
    lng: tripObject.startLocation.location.lng(),
    formatted_address: tripObject.startLocation.formatted_address
  },
  endLocation: {
    lat: tripObject.endLocation.location.lat(),
    lng: tripObject.endLocation.location.lng(),
    formatted_address: tripObject.endLocation.formatted_address
  }
});

export let getLatLngObject = (latLngObject) => {
  return {
    lat: latLngObject.location.lat(),
    lng: latLngObject.location.lng()
  };
}
