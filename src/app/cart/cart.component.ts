import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart2Service } from '../cart2.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService : Cart2Service, private  registerUser : RegisterService) { }
products:any=[];
cartProducts:any=[];
index =0
public grandTotal !: number; 
public grand !: number; 
public emailID!:any;

  ngOnInit(): void {
    // this.readCart();
    this.emailID = localStorage.getItem("UserEmailID");
    this.getProducts();
     
   // this.grandTotal= this.grandTotalcost() ;
  }
  getProducts()
  {
    this.cartService.getProducts(this.emailID).subscribe(
  
        (data)=>{
          console.log(data);
          console.log("email id is: "+this.emailID)
          this.products=data;
        },
        (err)=>{
          console.log(err);
        }
    )
  }

    

  decQuantity(item:any)
  {
     this.cartService.decQuantity(item).subscribe(
      (data)=>{
        console.log(data);
        if(item.quantity>1)
        alert("Quantity Decremented successfully");
        else
        {
        alert("Delete item from cart?");
        this.removeProduct(item);
        }
        this.getProducts();
      },
      (err)=>{
        console.log(err);
      }
    )
     
  }

  incQuantity(item:any)
  {
    this.cartService.incQuantity(item).subscribe(
      (data)=>{
        console.log(data);
        alert("Quantity Incremented successfully");
      console.log(item);
    
        this.getProducts();
      },
      (err)=>{
        console.log(err);
      }
    )
     
  }

  removeProduct(item:any)
  {
     this.cartService.removeProduct(item).subscribe(
       (data)=>{
         console.log(data);
         alert("Item Deleted successfully");
         this.getProducts();
       },
       (err)=>{
         console.log(err);
       }
     )
  }
emptyCart()
{
    this.cartService.emptyCart(this.emailID).subscribe(
      (data)=>{
        alert("Cart Emptied!");
        this.getProducts();
      },(err)=>{
        console.log(err);
      }
    )
}

onCheckout()
{
   this.cartService.doPayment().subscribe(
    (data)=>{
      alert("Payment started!");
    },(err)=>{
      console.log(err);
    }
   )
}


//  readCart()
//  {
//    console.log("Cart is getting read");
//    this.cartService.getProducts().subscribe(
//      (data)=>{
//        console.log(data);
//        this.cartProducts= data;
//        console.log("cart items:"+JSON.stringify(this.cartProducts[0]));
//      },
//      (err)=>{
//        console.log(err);
//      }
//    )
//  }
 

 grandTotalcost():number
 {
    this.grandTotal =0;
  // this.readCart();
  console.log("cart items:"+JSON.stringify(this.products[0]));
   var len = this.products.length;
  // console.log("Cart 1 cost: "+this.cartProducts[0].cost);
   console.log("length of cartProducts is: "+len);
   for( var i=0;i<len;i++)
   {
     if(this.products[i].useremail === this.emailID)
     {
     console.log("cart products cost is: "+ this.products[i].cost);
    this.grandTotal += this.products[i].cost * this.products[i].quantity;
     }
   }

  
   console.log("Total is: "+this.grandTotal);
   return this.grandTotal;
 
 }



//  grandTotalBackend(){
//   this.cartService.grandTotal().subscribe(
//    (data)=>{
//      console.log(data);
//      this.grand=data;
//    },
//    (err)=>{
//      console.log(err);
//    }
//   )
//  }

//  this.cartProducts.array.forEach((index:any) => {
  //   console.log("cart products cost is: "+ this.cartProducts[index].cost);
  //   this.grandTotal += this.cartProducts[index].cost * this.cartProducts[index].quantity;
  //  });
}
