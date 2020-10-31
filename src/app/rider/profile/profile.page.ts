import { Component, OnInit ,Input} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { Rider } from 'src/app/shared/rider';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid:string;
  riders:Rider[];
  currentRider:Rider={
    uid:'',
    f_name:'Nom',
    l_name:'Prénom',
    tel:'Numéro de télephone',
    adrs:'Adresse'
  };

  
  constructor(public auth:AuthenticationService,public toast:ToastController, public ngFireAuth: AngularFireAuth) {
    
   }


  ngOnInit() {
    
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid;
        console.log(this.uid);
        this.auth.GetRiderProfile().subscribe(items =>{
          this.riders=items;
          this.riders.forEach((element)=>{
            if(element.uid==this.uid){
              
              this.currentRider.uid=this.uid;
              this.currentRider.adrs=element.adrs;
              this.currentRider.f_name=element.f_name;
              this.currentRider.l_name=element.l_name;
              this.currentRider.tel=element.tel;
              console.log(this.uid);
            }
            
          })
          
          
         }
         );
        
      }
    })
  }
  


}
