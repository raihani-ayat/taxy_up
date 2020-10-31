import { Injectable, NgZone,OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {StatusService} from './status.service'
import { Observable } from 'rxjs';
import { Rider } from './rider';
import { Driver } from './driver';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements OnInit {
  RiderListRef: AngularFireList<any>;
  RiderRef: AngularFireObject<any>;
  userData: any;
  user:any;
  uid:string;
  obs:Observable<any>;
  riderObs:Observable<any>;
  driverObs:Observable<any>;


  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone ,
    public st:StatusService,
    public db: AngularFireDatabase
  ){ this.obs=this.afStore.collection('users').valueChanges();
  this.riderObs=this.afStore.collection('riders').valueChanges();
  this.driverObs=this.afStore.collection('drivers').valueChanges();}
  ngOnInit(){
    this.GetCurrentUser(); 
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid;
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    


  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);

  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['sign-up-confirm']);
    })
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

   // Sign-out 
   SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    })
  }

  //Adding New User in collection users
  SetUserData(user) {
    this.GetCurrentUser();
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`/users/`+this.uid);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      status:user.status,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  //Adding New User profile in collection riders
  SetRiderProfile(rider:Rider) {
    this.GetCurrentUser();
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`/riders/`+this.uid);
    const userData: Rider = {
      uid:rider.uid,
      f_name: rider.f_name,
      l_name: rider.l_name,
      tel: rider.tel,
      adrs: rider.adrs,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

   //Adding New User profile in collection drivers
   SetDriverProfile(driver:Driver) {
    this.GetCurrentUser();
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`/drivers/`+this.uid);
    const userData: Driver = {
      uid:driver.uid,
      f_name:driver.f_name,
      l_name:driver.l_name,
      tel:driver.tel,
      permis:driver.permis,
      vat:driver.vat,
      compTaxi:driver.compTaxi,
      vnum:driver.vnum,
      vtype:driver.vtype,
      vmodel:driver.vmodel,
      vbrand:driver.vbrand,
      vEnergy:driver.vEnergy,
      nSeats:driver.nSeats,
      liscence:driver.liscence,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

 
 //getting current user uid
   GetCurrentUser(){
     return this.ngFireAuth.currentUser.then( u=> 
     this.uid= u.uid )
  }
//getting current user data
  GetUserStatus(){
    this.GetCurrentUser();
    return this.obs;
  }

  //getting current [rider] user profile
  GetRiderProfile(){
    this.GetCurrentUser();
    return this.riderObs;
  }

  //getting current [driver] user profile
  GetDriverProfile(){
    this.GetCurrentUser();
    return this.driverObs;
  }

  

 

}