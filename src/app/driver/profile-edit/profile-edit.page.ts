import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup  } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import{Driver} from '../../shared/driver'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  DriverForm:FormGroup;
  driver:Driver={
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
    liscence:'',
    
  };
  constructor( public toast: ToastController, public auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.GetCurrentUser();
    
  }


  

  onSave(prenom:string, nom:string, num:string, permis: string, compagnie: string, vat:string, numv: string, typev:string, marquev: string, modelev: string, energiev: string, nbr:string, plaque:string){
    this.auth.GetCurrentUser();
    this.driver.uid=this.auth.uid;
    this.driver.f_name=prenom;
    this.driver.l_name=nom;
    this.driver.tel=num;
    this.driver.permis=permis;
    this.driver.compTaxi=compagnie;
    this.driver.vat=vat;
    this.driver.vnum=numv;
    this.driver.vtype=typev;
    this.driver.vbrand=marquev;
    this.driver.vmodel=modelev;
    this.driver.vEnergy=energiev;
    this.driver.nSeats=nbr;
    this.driver.liscence=plaque;
    console.log(this.driver)
   this.auth.SetDriverProfile(this.driver).then(()=>this.onSaved());
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
