import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import {StatusService} from "../shared/status.service"
import { User } from '../shared/user';


@Component({
  selector: 'app-sign-up-email',
  templateUrl: './sign-up-email.page.html',
  styleUrls: ['./sign-up-email.page.scss'],
})
export class SignUpEmailPage implements OnInit {
  signUpForm: FormGroup;

  constructor(public authService: AuthenticationService,
    public router: Router , 
    public st: StatusService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm=this.fb.group({
      status:[this.st.status],
    })
  }



  onPass(email:string, password:string){
    this.st.email=email;
    this.authService.RegisterUser(email,password)      
    .then((res) => {
      //this.authService.SendVerificationMail();
      this.router.navigate(['sign-up-confirm']);
      
    }).catch((error) => {
      window.alert(error.message)
    })
  }
 
 

  
  

}
