import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import {AlertController,ModalController} from '@ionic/angular'
import {HttpClient} from '@angular/common/http';
import { MapModalComponent } from '../shared/map-modal/map-modal.component';
import { AvailableModalComponent } from '../shared/available-modal/available-modal.component';
import{map, switchMap} from 'rxjs/operators';
import{of} from 'rxjs';
import { PlaceLocation } from '../shared/location.model';
import { AvaiableRider } from '../shared/rider';
import { AngularFireAuth } from '@angular/fire/auth';
declare var google:any

@Component({
  selector: 'app-rider',
  templateUrl: './rider.page.html',
  styleUrls: ['./rider.page.scss'],
})
export class RiderPage implements OnInit {

selectedLocation:string;
address:string;
isLoading=false;
validate=false;
validating=false;
mlat:number;
mlng:number;
uid:string;
min:number;
min_index:number;
distances:number[];
uids:string[];
available:AvaiableRider={
  uid:'',
  lat:0,
  lng:0,
  address:'',
}
availableRiders:AvaiableRider[];

  constructor(public auth:AuthenticationService, public alert: AlertController, public mod:ModalController, public http:HttpClient , public ngFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid;
        console.log(this.uid);
        this.auth.GetRiderProfile().subscribe(items =>{
          items.forEach((element)=>{
            if(element.uid==this.uid){
              this.auth.uid=this.uid;
              console.log(this.uid);
            }
            
          })
          
          
         }
         );
        
      }
    });
  

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
          this.address=pickedLocation.address;
          return of(this.getStaticImgUrl(pickedLocation.lat,pickedLocation.lng,14));

        })).subscribe(staticMapImgUrl=>{
          pickedLocation.staticMapImageUrl=staticMapImgUrl;
          this.selectedLocation=staticMapImgUrl;
          this.validate=true;
          this.isLoading=false;
          this.auth.GetCurrentUser();
          console.log(this.auth.uid);
          this.available.uid=this.auth.uid;
          this.available.lat=pickedLocation.lat;
          this.available.lng=pickedLocation.lng;
          this.available.address=pickedLocation.address;
          this.mlat=pickedLocation.lat;
          this.mlng=pickedLocation.lng;

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
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:blue%7Clabel:Place%7C${lat},${lng}
    &key=AIzaSyCuDs5aQb2hVSwH_r6Cs3Y4rclgDIiB59E`
  }

  onValidateLocation(){
    this.validating=true;
    this.auth.SetAvailableRiDer(this.available);
    this.getClosestClient();

    
  }

  private getClosestClient(){
   

    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid;
        console.log(this.uid);
        var _to= new google.maps.LatLng(this.mlat,this.mlng);
        this.auth.GetAvailableRiderData().subscribe(items =>{
          this.availableRiders=items;
          this.availableRiders.forEach((element)=>{
            var _from = new google.maps.LatLng(element.lat,element.lng);
            this.distances.push(google.maps.geometry.spherical.computeDistanceBetween(_from, _to));
            this.uids.push(element.uid);
            
          })
          this.min=Math.min.apply(null,this.distances);
          if(this.min==Infinity){
            this.validating=false;
            this.onInfinity();
          }
          else{
            this.min_index=this.distances.indexOf(Math.min.apply(null,this.distances));
          this.uid=this.uids[this.min_index];
          this.auth.GetAvailableRiderData().subscribe(items =>{
            this.availableRiders.forEach((element)=>{
                if(element.uid==this.uid){
                  this.auth.closestRider.address=element.address;
                  this.auth.closestRider.lat=element.lat;
                  this.auth.closestRider.lng=element.lng;
                }
              
            })         
           }
           
           );
           this.mod.create({component:AvailableModalComponent}).then(modEl=>{
            // modEl.onDidDismiss();
             modEl.present();
           })
          }
          
          
         }
         );

         
        
      }
    })
  }

  async onInfinity(){
    const alert= await this.alert.create({
      header:'Alerte',
      message:'Pas de taxi disponible près de vous en ce moment.',
      buttons:[
        
        {
          text:'ok',
          role:'cancel',
        }
      ]
    });
    await alert.present();
  }

}
