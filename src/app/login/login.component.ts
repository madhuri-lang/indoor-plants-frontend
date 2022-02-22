import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm!: FormGroup
  // authenticationService: any;
  // public user:any[]=[{
  //   name:'Madhuri',
  //   id:1
  // }]
  constructor(private formBuilder:FormBuilder, private http: HttpClient , private router:Router ,private registerUser: RegisterService,private authenticationService:AuthenticationService) { }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['', Validators.required]
    })
  }


  login()
  {
  if(this.loginForm.valid)
  {
    
    this.registerUser.onLogin(this.loginForm.value).subscribe(
      (data)=>
     {
       if(data ==="valid user")
       {
        alert("Valid User and Login Successful..");
        this.authenticationService.login();
        console.log("valid user");
        this.router.navigate(['home']);
       }
       else if(data==="You are not a valid user") {
         alert("Invalid user, please check your Password");
         this.loginForm.reset();
       }
       else{
         alert("Invalid user, please check your email");
         this.loginForm.reset();
       }
     },(err)=>
     {
       console.log(err);
     }
     )
  }
}
logInForAuthGuard()
{
  this.authenticationService.login();
}
logOutForAuthGuard()
{
  this.authenticationService.logout();
}
  

}
