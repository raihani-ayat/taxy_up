import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from "@angular/router";
import {Rider} from '../../shared/rider'
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
 riderForm:FormGroup;
 rider:Rider={
   f_name:'',
   l_name:'',
   tel:'',
   uid:this.auth.uid,
   adrs:''
 };

  constructor(public router: Router , public fb: FormBuilder, public auth:AuthenticationService, public toast:ToastController) {
    
   }

  ngOnInit() {
    this.auth.GetCurrentUser();
    this.riderForm=this.fb.group({
      f_name:[''],
      l_name:[''],
      tel:[''],
      adrs:['']
    })
  }

  FormSubmit(first,last,tel,adrs){
    this.auth.GetCurrentUser();
    this.rider.uid=this.auth.uid;
    this.rider.f_name=first;
    this.rider.l_name=last;
    this.rider.tel=tel;
    this.rider.adrs=adrs;
    console.log(this.rider)
   this.auth.SetRiderProfile(this.rider).then(()=>this.onSaved());
  }

 async onSaved(){
    const po=await this.toast.create(
      {
        message:'Enregistré avec succés',
        duration:1000,
      }
    );
    po.present();
  } 

}
