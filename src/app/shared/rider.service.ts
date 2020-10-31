import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthenticationService } from './authentication-service';




@Injectable({providedIn:'root'})
export class RiderService{
  RiderListRef: AngularFireList<any>;
  RiderRef: AngularFireObject<any>;
  

    

  constructor(private db: AngularFireDatabase, public auth:AuthenticationService ){}


   writeUserData(userId, f_name, l_name, tel,adrs) {
     console.log(this.auth.uid);
    this.db.database.ref('riders/' + userId).set({
      first_name:f_name,
      last_name:l_name,
      phone_number:tel,
      address:adrs,
    });
  }

  getUserStatus(){
   this.auth.GetCurrentUser();
   this.RiderListRef=this.db.list('/users/');
   return this.RiderListRef;
    
  }


  

  
  /*Create
  createBooking(rider:Rider) {
    return this.RiderListRef.push({
      fName: rider.f_name,
      lName: rider.l_name,
      mobile: rider.tel,
      address: rider.adrs,
    })
  }

  // Get Single
  getBooking() {
    this.RiderRef = this.db.object('/Riders/');
    return this.RiderRef;
  }

  // Get List
  getBookingList() {
    this.RiderListRef = this.db.list('/Riders');
    return this.RiderListRef;
  }

  // Update
  updateBooking(id, rider: Rider) {
    return this.RiderRef.update({
        fName: rider.f_name,
        lName: rider.l_name,
        mobile: rider.tel,
        address: rider.adrs,
    })
  }

  // Delete
  deleteBooking(id: string) {
    this.RiderRef = this.db.object('/Riders/' + id);
    this.RiderRef.remove();
  }*/

}