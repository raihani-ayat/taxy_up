import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { StatusService } from '../shared/status.service';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from '../shared/user';
import { Rider } from '../shared/rider';
import { Driver } from '../shared/driver';

@Component({
  selector: 'app-sign-up-confirm',
  templateUrl: './sign-up-confirm.page.html',
  styleUrls: ['./sign-up-confirm.page.scss'],
})
export class SignUpConfirmPage implements OnInit {
  currentUser:User={
    uid:'',
    email:'',
    emailVerified:false,
    status:''

  };
  newRider:Rider={
    uid:'',
    f_name:'',
    l_name:'',
    tel:'',
    adrs:'',
  }

  newDriver:Driver={
    uid:'',
    f_name:'',
    l_name:'',
    tel:'',
    permis:'',
    vat:'',
    compTaxi:'',
    vnum:'',
    vtype:'',
    vmodel:'',
    vbrand:'',
    vEnergy:'',
    nSeats:'',
    liscence:''
  }


  constructor(private auth:AuthenticationService, public sts:StatusService,private actRoute: ActivatedRoute,
    private router: Router) {

     }

  ngOnInit() {
    this.auth.GetCurrentUser();
  }

  OnResend(){
    this.auth.SendVerificationMail();
  }

  onNext(){
    this.auth.GetCurrentUser();
    this.currentUser.uid=this.auth.uid;
    this.currentUser.email=this.sts.email;
    this.currentUser.emailVerified=true;
    this.currentUser.status=this.sts.status;
    console.log(this.currentUser.uid);
    this.auth.SetUserData(this.currentUser);
    if(this.currentUser.status=='rider'){
      this.newRider.uid=this.currentUser.uid;
    this.auth.SetRiderProfile(this.newRider).then(
      ()=>{
        this.router.navigate(['rider']);
      });
      
    }
    if(this.currentUser.status=='driver'){
      this.newDriver.uid=this.currentUser.uid;
      this.auth.SetDriverProfile(this.newDriver).then(
        ()=>{
          this.router.navigate(['driver']);
        });
      
    }
    

    
  }

}
