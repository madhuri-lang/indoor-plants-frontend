import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

   public signupForm !:  FormGroup
  constructor(private formBuilder:FormBuilder, private http : HttpClient ,private router:Router, private registerUser: RegisterService){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name:['',Validators.required],
        phone:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required]
      }
    )
  }

  //make method to creater user

  onSignUp()
  {
   if(this.signupForm.valid)
   { 
     this.registerUser.onSignUp(this.signupForm.value).subscribe
    (
          (data)=>{
      
            alert("Registration Successful!")
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          (error)=>{
            console.log(error);
          }
    );
   }
  }

}


