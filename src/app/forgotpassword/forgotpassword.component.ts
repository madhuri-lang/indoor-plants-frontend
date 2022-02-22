import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public forgotForm!: FormGroup
  constructor(private formBuilder:FormBuilder, private http: HttpClient , private router:Router ,private registerUser: RegisterService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email:['',Validators.required]
    })
  }
  forgotpassword()
  {

  if(this.forgotForm.valid)
  {
  
    this.registerUser.onForgotPassword(this.forgotForm.value).subscribe(
      (data)=>{
        console.log(data);
        alert("Get password from mail");
        this.router.navigate(['resetpassword']);
      },(err)=>
      {
        console.log(err);
      }
      
    )}
  }

}