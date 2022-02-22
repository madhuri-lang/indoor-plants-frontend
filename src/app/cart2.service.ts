import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class Cart2Service {
  // products:any=[];
  public grandTotal !: number;
  // public userEmail!:string;
  constructor(private http:HttpClient , private registeruser:RegisterService) {
    
   }
  baseUrl= "http://localhost:3000/"
  getProducts(email:string): Observable<any>
  {
    
     var URL = this.baseUrl +"getProducts/"+ email;
     return this.http.get(URL);
  }
  insertProduct(product:any) :Observable<any>
  {

    console.log(product.cost);
    console.log("email is : "+localStorage.getItem('userEmail'));
    var URL = this.baseUrl+"cart";
    var body= {"cost":product.cost,"cardtitle":product.cardtitle,"url":product.url,"category":product.category,"id":product.id ,"quantity":product.quantity,"useremail":localStorage.getItem('UserEmailID')};
    var header = {'content-type':'application/json'};
    return this.http.post(URL, body , {'headers': header , responseType:'text'} );
  }

   removeProduct(product:any): Observable<any>
   {
     var URL = this.baseUrl+'removeProduct/'+product.id;
     return this.http.delete(URL , {responseType: 'text'});
   }

   emptyCart(email:string):Observable<any>
   {
     var URL = this.baseUrl+'emptyCart/'+email;
     return this.http.delete(URL,{responseType:'text'});
   }

   decQuantity(product:any): Observable<any>
   {
     var URL = this.baseUrl+"decQuantity";
     var body= JSON.stringify(product);
    var header = {'content-type':'application/json'};
    return this.http.put(URL, body , {'headers': header , responseType:'text'} );
   }
   incQuantity(product:any): Observable<any>
   {
     var URL = this.baseUrl+"incQuantity";
     var body= JSON.stringify(product);
    var header = {'content-type':'application/json'};
    return this.http.put(URL, body , {'headers': header , responseType:'text'} );
   }
   
   doPayment():Observable<any>
   {
     var URL = this.baseUrl+"doPayment";
      return this.http.get(URL);
   }
    
   deleteAllItems(email:string):Observable<any>
   {
     var URL = this.baseUrl + "deleteAllItems/"+email;
     return this.http.delete(URL)
   }
  //  getAllOrders():Observable<any>
  //  {
  //    var URL = this.baseUrl+"addOrder";
  //    var body= this.getProducts(localStorage.getItem('UserEmailID'));
  //    var header = {'content-type':'application/json'};
  //    return this.http.post(URL,body,{'headers': header , responseType:'text'});
  //  }

  //  grandTotal():Observable<any>
  //  {
  //    var URL = this.baseUrl+"grandTotal";
  //    return this.http.get(URL);
  //  }
  
  //  grandTotalcost():number
  //  {
  //     this.grandTotal =0;
  //   // this.readCart();
  //   console.log("cart items:"+JSON.stringify(this.products[0]));
  //    var len = this.products.length;
  //   // console.log("Cart 1 cost: "+this.cartProducts[0].cost);
  //    console.log("length of cartProducts is: "+len);
  //    for( var i=0;i<len;i++)
  //    {
  //      console.log("cart products cost is: "+ this.products[i].cost);
  //     this.grandTotal += this.products[i].cost * this.products[i].quantity;
  //    }
  
    
  //    console.log("Total is: "+this.grandTotal);
  //    return this.grandTotal;
   
  //  }
}
