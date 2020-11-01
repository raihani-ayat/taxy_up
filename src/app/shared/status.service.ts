import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from "@angular/router";



@Injectable({
providedIn:'root'
})

export class StatusService{
  userListRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  email:string;
  driver=false;
  rider=false;
  status:string;
  
  

  constructor(private route: ActivatedRoute,public db:AngularFireDatabase,public afStore: AngularFirestore) {}   

  
  

    IsDriver(){
        this.driver=true;
        this.status="driver";
        console.log(this.status);
        console.log(this.driver);
        console.log(this.rider);
        return this.driver;
        
    }
    IsRider(){
        this.rider=true;
        this.status="rider";
        console.log(this.status);
        console.log(this.driver);
        console.log(this.rider);
       return this.rider;

    }

    

   //Get Single
  getUsers() {
   this.userListRef=this.db.list('/Users');
   return this.userListRef;
   
  }

  //getting list element with id

  getUser(id){
    this.userRef = this.db.object( '/Users/'+id);
    console.log(this.userRef);
    return this.userRef
  }
  
    

}