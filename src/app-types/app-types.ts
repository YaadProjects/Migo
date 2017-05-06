export const APP_NAME = 'SpareSeAT';

export enum TripTypeEnum {
  OneWay,
  Round
}

export enum TripStatusEnum {
  Requested,
  PendingConfirmation,
  Completed,
  NoMatch,
  Cancelled
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
    name: string;
  };
  endLocation?: {
    location: {
      lat: Function,
      lng: Function
    }
    formatted_address: string;
    name: string;
  };
  startTime?: string; //ToDo: need to decide if we want to store timeStamp i guess that will be amazing
  endTime?: string; // same for this
  createdAt?: Object ;
  updateAt?: Object ;
  type?: TripTypeEnum; // This is a number [0, 1]
  cpm?: number;
  status: TripStatusEnum;
  authId?: String;
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
      name: string;
  };
  endLocation?: {
      lat: number,
      lng: number
      formatted_address: string;
      name: string;
  };
  startTime?: string; //ToDo: need to decide if we want to store timeStamp i guess that will be amazing
  endTime?: string; // same for this
  createdAt?: Object; //ToDo: do we need this?
  type?: TripTypeEnum; // This is a number [0, 1]
  status: TripStatusEnum;
  authId?: String;
}
