import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   
  public cartItemList:any=[];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { } 
  getProducts()
  {
    return this.productList.asObservable();
  }
  setProduct(product: any)
  {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  public count=0;
  // counttoCart(product:any, count:number)
  // {
  //   this.cartItemList.push(product);
  //   count+=1;
  //   this.onCart(this.cartItemList, count);
  //   this.productList.next(this.cartItemList);
  //   this.getTotalPrice();
  //   console.log(this.cartItemList);
  // }

  addtoCart(product:any): Observable<any>
  {
    alert("Added to Cart!");
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
     this.getTotalPrice();
    console.log("on cart is working ");
    var URL = "http://localhost:3000/cart";
     var body=JSON.stringify(product);
    console.log("json body is : "+body);
    let header= {'content-type':'application/json'};
    return this.http.post(URL,body,{'headers':header});
   
   
  } 
   
    // console.log(this.cartItemList);
    // console.log("on cart is working ");
    // var URL = "http://localhost:3000/cart";
    //console.log("cost of 1st array is "+cartItemList[0].cost)
   // var length = this.cartItemList.length;
  //var body={"cost": 123 , "cardtitle": 'card' ,"url":'http', "category":'cat',"id":2,"quantity":2};
    // var body=JSON.stringify(product);
    // console.log("json body is : "+body);
    // let header= {'content-type':'application/json'};
    // return this.http.post(URL,body,{'headers':header, responseType:'json'});
   
    
  

  // onCart(cartItemList:any): Observable<any>
  // {
  //   console.log("on cartitemlist is working ");
  //   var URL = "http://localhost:3000/cart";
  //   console.log("cost of 1st array is "+cartItemList[0].cost)
  //   var length = this.cartItemList.length;
  // //var body={"cost": 123 , "cardtitle": 'card' ,"url":'http', "category":'cat',"id":2,"quantity":2};
  //   var body=JSON.stringify(cartItemList[length-1]);
  //   console.log("json body is : "+body);
  //   let header= {'content-type':'application/json'};
  //   return this.http.post(URL,body,{'headers':header, responseType:'json'});
  // }

  getTotalPrice() : number
  {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
    
    console.log("quantity is"+a.quantity)
      grandTotal += a.cost*a.quantity;
      console.log("grand total price is:"+grandTotal);
    })
    return grandTotal;
  }

  removeCartItem(product:any)
  {
    this.cartItemList.map( (a:any, index:any)=>{
      if(product.id === a.id)
      {
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart()
  {
    
    this.cartItemList=[];
    this.productList.next(this.cartItemList);
  }

  incQuantity(product:any)
  {
    product.quantity = product.quantity+1;
  }

  decQuantity(product:any)
  {
    if(product.quantity==1)
    {
      alert("Product delete from cart?");
      this.removeCartItem(product);
    }
    product.quantity = product.quantity-1;
  }
}
