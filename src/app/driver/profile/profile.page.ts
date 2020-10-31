import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { Driver } from 'src/app/shared/driver';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid:string;
  drivers:Driver[];
  currentDriver:Driver={
    uid:'',
    f_name:'First Name',
    l_name:'Last Name',
    tel:'Telephone',
    permis:'',
    vat:'',
    compTaxi:'',
    vnum:'',
    vtype:'',
    vmodel:'',
    vbrand:'',
    vEnergy:'',
    nSeats:'',
    liscence:'',
  };

  constructor(public ngFireAuth:AngularFireAuth, public auth:AuthenticationService) { }

  ngOnInit() {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid;
        console.log(this.uid);
        this.auth.GetDriverProfile().subscribe(items =>{
          this.drivers=items;
          this.drivers.forEach((element)=>{
            if(element.uid==this.uid){
              if(
                element.f_name=="" &&
                element.l_name=="" &&
                element.compTaxi=="" &&
                element.liscence=="" &&
                element.permis==""&&
                element.vat==""&&
                element.tel==""
              ){
                this.currentDriver.f_name="first name";
                this.currentDriver.l_name="Last name";
                this.currentDriver.liscence="liscence";
                this.currentDriver.permis="permis";
                this.currentDriver.tel="Télephone";
                this.currentDriver.compTaxi="Companie de Taxi";
                this.currentDriver.vat="VAT";
              }
              this.currentDriver.uid=this.uid;
              this.currentDriver.f_name=element.f_name;
              this.currentDriver.l_name=element.l_name;
              this.currentDriver.tel=element.tel;
              this.currentDriver.permis=element.permis;
              this.currentDriver.vat=element.vat;
              this.currentDriver.vnum=element.vnum;
              this.currentDriver.vbrand=element.vbrand;
              this.currentDriver.vmodel=element.vmodel;
              this.currentDriver.vtype=element.vtype;
              this.currentDriver.compTaxi=element.compTaxi;
              this.currentDriver.vEnergy=element.vEnergy;
              this.currentDriver.liscence=element.liscence;
              this.currentDriver.nSeats=element.nSeats;
              
              console.log(this.uid);
            }
            
          })
          
          
         }
         );
        
      }
    })
  }

   
   

}
