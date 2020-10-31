import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import {AlertController, ModalController} from '@ionic/angular'
import { MapModalComponent } from '../shared/map-modal/map-modal.component';
import {HttpClient} from '@angular/common/http'
import{map, switchMap} from 'rxjs/operators'
import{of} from 'rxjs'
import { PlaceLocation } from '../shared/location.model';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {
selectedLocation:string;
isLoading=false;
  constructor( public auth:AuthenticationService, public alert: AlertController, public mod:ModalController, public http:HttpClient) { }

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

  onPickLocation(){
    this.mod.create({component:MapModalComponent}).then(modEl=>{
      modEl.onDidDismiss().then(modalData=>{
        if(!modalData){
          return;
        }
        const pickedLocation:PlaceLocation={
          lat:modalData.data.lat,
          lng:modalData.data.lng,
          address:null,
          staticMapImageUrl:null
        }
        this.isLoading=true;
        this.getAddress(modalData.data.lat, modalData.data.lng).pipe(switchMap(address=>{
          pickedLocation.address=address;
          return of(this.getStaticImgUrl(pickedLocation.lat,pickedLocation.lng,14));

        })).subscribe(staticMapImgUrl=>{
          pickedLocation.staticMapImageUrl=staticMapImgUrl;
          this.selectedLocation=staticMapImgUrl;
          this.isLoading=false;
        });
      })
      modEl.present();
    })
  }

  private getAddress(lat:number, lng:number){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCuDs5aQb2hVSwH_r6Cs3Y4rclgDIiB59E`).
    pipe(map(geoData=>{
      if(!geoData || !geoData.results || geoData.results===0){
        return null;
      }
      return geoData.results[0].formatted_address;
    }))

  }
  
  private getStaticImgUrl(lat:number, lng:number, zoom:number){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}NY&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:blue%7Clabel:Place%7C${lat},${lng}
    &key=AIzaSyCuDs5aQb2hVSwH_r6Cs3Y4rclgDIiB59E`
  }

  

}
