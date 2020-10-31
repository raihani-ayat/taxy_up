import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import {AlertController} from '@ionic/angular'

@Component({
  selector: 'app-rider',
  templateUrl: './rider.page.html',
  styleUrls: ['./rider.page.scss'],
})
export class RiderPage implements OnInit {

  constructor(public auth:AuthenticationService, public alert: AlertController) { }

  ngOnInit() {
  }

  async onSignOut(){
    const alert= await this.alert.create({
      header:'Confirmation',
      message:'Etes vous sure de vouloir se déconnecter?',
      buttons:[
        {
          text:'Oui',
          handler:()=>{
            this.auth.SignOut();
          }
        },
        {
          text:'Non',
          role:'cancel',
        }
      ]
    });
    await alert.present();
  }

}
