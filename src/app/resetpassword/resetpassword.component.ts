import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  public resetForm!: FormGroup
  constructor(private formBuilder:FormBuilder, private http: HttpClient , private router:Router ,private registerUser: RegisterService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  resetpassword()
  {

  if(this.resetForm.valid)
  {
  
    this.registerUser.onResetPassword(this.resetForm.value).subscribe(
      (data)=>{
        console.log(data);
        alert("Password updated");
        this.router.navigate(['login']);
      },(err)=>
      {
        console.log(err);
      }
      
    )}
  }

}