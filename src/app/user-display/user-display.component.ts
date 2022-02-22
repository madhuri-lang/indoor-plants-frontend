import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {
  columns= ["ID","Name" ,"Phone", "Email ID", "Password"];

orderColumns = ["Product Id","Cost","CardTitle","Category","Quantity","Date of Order"];
   
   signupUsers : any =[];

   searchText:any;
   public emailID!:any; 
    orders:any=[];
  constructor(private us : UsersService,private router: Router,private activatedRoute : ActivatedRoute){}
  ngOnInit(): void {
    this.emailID = localStorage.getItem("UserEmailID");
  }
  getAllUsers()
  {
  this.us.getUsers().subscribe(
   (data)=>{
     console.log("Received data: "+JSON.stringify(data));
     this.signupUsers=data;
   },
    (error)=>
    {
      console.log("Error Occured: "+error);
    }
  )
  }

  name="";
  getUserByName()
  {
    this.us.getUserByName(this.name).subscribe(
      (data)=>
      {
        console.log("Received data: "+JSON.stringify(data));
        this.signupUsers=data;
      },
      (error)=> console.log(error)
    )
  }

  id=0;
  getUserById()
  {
    this.us.getUserById(this.id).subscribe(
      (data)=>
      {
        console.log("Received data: "+JSON.stringify(data));
        this.signupUsers=data;
      },
      (error)=> console.log(error)
    )
  }

   getOrdersByEmail()
   {
     console.log("Order function email is:"+this.emailID);
     this.us.getOrder(this.emailID).subscribe(
       (data)=>{
        console.log("Received data: "+JSON.stringify(data));
         this.orders=data;
       },     
        (error)=> console.log(error)
     )
   }

   
}
