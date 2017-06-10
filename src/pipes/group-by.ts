import { Pipe, PipeTransform } from '@angular/core';
import { TripObjectInterface, TripStatusEnum } from '../app-types/app-types';

@Pipe({
  name: 'groupby'
})

export class GroupBy implements PipeTransform {
  transform(trips:Array<TripObjectInterface>, groupByAttr) {
    let tripsGrouped:Array<any> = [];
    // let currenDate:string;
    let currentStatus:number;
    let currentGroup:Array<any>;

    if(trips) {
      trips.forEach((trip) => {
        if (currentStatus !== trip.status){
          currentStatus = trip.status;
          currentGroup = [trip];

          tripsGrouped.push({
            name: TripStatusEnum[currentStatus],
            trips: currentGroup
          });
        } else {
          currentGroup.push(trip);
        }
      });
    }

    // console.log('trips', trips);

    // if (trips) {
    //   trips.forEach(function(trip){
    //     if (currenDate !== trip.startTime.substr(0,10)){
    //       currenDate = trip.startTime.substr(0,10);
    //       currentGroup = [trip];

    //       tripsGrouped.push({
    //         name: currenDate,
    //         trips: currentGroup
    //       });
    //     } else {
    //       currentGroup.push(trip);
    //     }
    //   });
    // }
    console.log('tripsGrouped', tripsGrouped);
    return tripsGrouped;
  }
}
