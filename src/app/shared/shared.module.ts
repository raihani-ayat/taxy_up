import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickComponent } from './pickers/location-pick/location-pick.component';

@NgModule({
    declarations:[LocationPickComponent, MapModalComponent],
    exports:[LocationPickComponent, MapModalComponent],
    imports:[CommonModule,IonicModule],
    
})


export class SharedModule{

}