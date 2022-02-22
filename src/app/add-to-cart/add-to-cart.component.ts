import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
     public products :any=[];  
     public grandTotal !: number; 
  constructor(private cartService: CartService , private registerService : RegisterService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(
      res=>{
        this.products = res;
        this.grandTotal=this.cartService.getTotalPrice();
      }
    )
  }
  removeItem(item:any)
  {
    this.cartService.removeCartItem(item);
  }

  emptyCart()
  {
    this.cartService.removeAllCart();
  }
  inc(item:any)
  {
    this.cartService.incQuantity(item);
  }
  dec(item:any)
  {
    this.cartService.decQuantity(item);
  }
   onCheckout()
   {
     this.registerService.onCheckOut().subscribe(
       res=>{
         console.log(res);
       },err=>{
         console.log(err);
       }
     );
   }
}
