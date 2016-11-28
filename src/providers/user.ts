import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export interface User{
  name: string;
  email: string;
  type?: string; // can be used to itentify if Driver/Rider in the last time.
}
let dummyUser:User = {
  name: 'Sam',
  email: 'sam@projectx.com'
}

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {


  constructor(public http: Http) {

  }

  getUser():Promise<User>{
    return Promise.resolve(dummyUser);
  }

}
