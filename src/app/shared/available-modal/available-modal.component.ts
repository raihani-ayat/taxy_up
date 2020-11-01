import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../authentication-service';


@Component({
  selector: 'app-map-modal',
  templateUrl: './available-modal.component.html',
  styleUrls: ['./available-modal.component.scss'],
})
export class AvailableModalComponent implements OnInit, AfterViewInit, OnDestroy {
address:string;

  constructor(public mod:ModalController, public auth: AuthenticationService) { }

  ngOnInit() { 
    this.address=this.auth.closestRider.address;
  }

  ngAfterViewInit(){
    
  }

  onCancel(){
    this.mod.dismiss();
  }

  ngOnDestroy(){
  }

  onValidate(){
      
  }


  

}