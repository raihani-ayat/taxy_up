import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-sign-up-status',
  templateUrl: './sign-up-status.page.html',
  styleUrls: ['./sign-up-status.page.scss'],
})
export class SignUpStatusPage implements OnInit {

  constructor(public status:StatusService) { }

  ngOnInit() {
  }

  onDriver(){
    this.status.IsDriver();
  }
  onRider(){
    this.status.IsRider();
  }

}
