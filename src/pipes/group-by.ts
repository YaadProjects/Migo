import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupby'
})

export class GroupBy implements PipeTransform {
  transform(trips:Array<any>, groupByAttr) {
    let tripsGrouped:Array<any> = [];
    let currenDate:string;
    let currentGroup:Array<any>;

    console.log('trips', trips);

    if (trips) {
      trips.forEach(function(trip){
        if (currenDate !== trip.startTime.substr(0,10)){
          currenDate = trip.startTime.substr(0,10);
          currentGroup = [trip];

          tripsGrouped.push({
            name: currenDate,
            trips: currentGroup
          });
        } else {
          currentGroup.push(trip);
        }
      });
    }
    console.log('tripsGrouped', tripsGrouped);
    return tripsGrouped;
  }
}
