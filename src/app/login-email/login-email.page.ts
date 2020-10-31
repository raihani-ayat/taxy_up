import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { RiderService } from '../shared/rider.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {
  items:User[];
  item:User={
    email:'',
    emailVerified:false,
    status:'',
    uid:''
  };


  constructor(public authService: AuthenticationService ,public router:Router,public rd:RiderService) { }

  ngOnInit() {
    
  }
onPass(email:string, password:string){
  this.authService.SignIn(email, password);
  this.authService.GetUserStatus().subscribe(items=>{
    this.items=items;
    this.items.forEach((element)=>
    {
      if(element.email==email){
        this.item=element;
        
      }
    })
  console.log(this.item.email);
  console.log(this.item.uid);
  console.log(this.item.status);
  if(this.item.status=='driver'){
    this.router.navigate(['driver']);
   }
   if(this.item.status=='rider'){
    this.router.navigate(['rider']);
   }
  }) 
}

googleLogin(){
 this.authService.GoogleAuth();
}

appleLogin(){

}

fbLogin(){

}
recoverPassword(email:string){
  this.authService.PasswordRecover(email);
}
}
