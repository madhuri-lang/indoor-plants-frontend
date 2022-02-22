import { Component, OnInit } from '@angular/core';

import { PlantsService } from '../plants.service';

import { Plants } from '../Plants';

import { CartService } from '../cart.service';
import { Cart2Service } from '../cart2.service';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {

  searchText:any;
 gridColumns=3;

    cartProducts:any=[];

  public productList:any;
  public filterCategory: any;

  plants:Plants[]=[];

public emailID !:any;
  constructor(private ps:PlantsService, private cartService:Cart2Service) { }
   
  ngOnInit(): void {
    this.emailID = localStorage.getItem("UserEmailID");
    this.ps.getPlants().subscribe
    (
      (data)=>
      {
        this.plants=data;
        this.filterCategory=data;
        this.plants.forEach( (a:any)=>{
          Object.assign(a, {quantity:1, total:a.price});
        })
     
      } ,
      (error)=>
      {
        console.log("Error Occured: "+error);
      }
    )
  this.readCart();
      
  }
  readCart()
    {
      this.cartService.getProducts(this.emailID).subscribe(
        (data)=>{
          this.cartProducts= data;
          console.log("cart items:"+this.cartProducts);
        },
        (err)=>{
          console.log(err);
        }
      )
    }
 
  
 addToCart(item:any)
 {
   this.readCart();
   var b = false;
   console.log("array length: "+this.cartProducts.length)
   for(var i=0;i<this.cartProducts.length;i++)
   {
   console.log("b is:"+b);
    if(this.cartProducts[i].id == item.id)
    {
     b=true;
    break;
    }
  }
  console.log("b value"+b);

   if(b==false)
   {
    this.cartService.insertProduct(item).subscribe(
      (data)=>{
        alert(data);
      },(error)=>
      {
        console.log(error);
      }
    );
   }
   else{
     alert("Already in cart!");
   }
  }
  
  

 filter(category:string)
 {
  this.filterCategory = this.plants.filter( (a:any)=>{
    if(a.category==category || category=='')
    {
      return a;
    }
  }) 
 }

     
}
