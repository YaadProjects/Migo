export enum TripTypeEnum {
  OneWay,
  Round
}

export const USERTYPES = {
  driver: {
    name: 'driver'
  }, passenger: {
    name: 'passenger',
  }
};


export interface TripObjectInterface {
  //some info about the user
  userType: string;
  userId?: number;
  //info about the trip
  startLocation?: {
    location: {
      lat: Function,
      lng: Function
    },
    formatted_address: string;
  };
  endLocation?: {
    location: {
      lat: Function,
      lng: Function
    }
    formatted_address: string;
  };
  startTime?: string; //ToDo: need to decide if we want to store timeStamp i guess that will be amazing
  endTime?: string; // same for this
  createdAt?: number | string; //ToDo: do we need this?
  type?: TripTypeEnum; // This is a number [0, 1]

}

export interface TripObjectInDB {
  //some info about the user
  userType: string;
  userId?: number;
  //info about the trip
  startLocation?: {
      lat: number,
      lng: number,
      formatted_address: string;
  };
  endLocation?: {
      lat: number,
      lng: number
      formatted_address: string;
  };
  startTime?: string; //ToDo: need to decide if we want to store timeStamp i guess that will be amazing
  endTime?: string; // same for this
  createdAt?: number | string; //ToDo: do we need this?
  type?: TripTypeEnum; // This is a number [0, 1]

}
