import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('map') mapElementRef:ElementRef; 
clickListener:any;
googleMaps:any;
  constructor(public mod:ModalController, public ren:Renderer2) { }

  ngOnInit() { 
    
  }

  ngAfterViewInit(){
    this.getGoogleMaps().then(googleMaps=>{
      this.googleMaps=googleMaps;
      const mapEl=this.mapElementRef.nativeElement;
      const map=new googleMaps.Map(mapEl,{
        center:{lat:-34.987, lng:150.696},
        zoom:16
      });

      this.googleMaps.event.addListenerOnce(map, 'idle', ()=>{
          this.ren.addClass(mapEl,'visible');
      });

      this.clickListener=map.addListener('click',Event=>{
        const selectedCoords= {lat: Event.latLng.lat(),lng: Event.latLng.lng()};
        this.mod.dismiss(selectedCoords);
      })
      
      
    }).catch(err=>{
        console.log(err);
    });
  }

  onCancel(){
    this.mod.dismiss();
  }

  ngOnDestroy(){
    this.googleMaps.event.removeListener(this.clickListener)

  }
  private getGoogleMaps():Promise<any>{
    const win= window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps)
    }
    return new Promise((resolve, reject)=>{
        const script = document.createElement('script');
        script.src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCuDs5aQb2hVSwH_r6Cs3Y4rclgDIiB59E';
        script.async=true;
        script.defer=true;
        document.body.appendChild(script);
        script.onload=()=>{
          const loadedGoogleModule= win.google;
          if(loadedGoogleModule && loadedGoogleModule.maps){
            resolve(loadedGoogleModule.maps)
          }
          else{
            reject('Google Maps SDK not available');
          }
        }
    })
  }

  

}
