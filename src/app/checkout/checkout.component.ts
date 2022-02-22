import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService} from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { Cart2Service } from '../cart2.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [StripeService]
})
export class CheckoutComponent implements OnInit {

  elements: any;
  card: any;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading:any;


  // optional parameters
  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  stripeForm !: FormGroup;
  products:any=[];
  index =0
  public grandTotal !: number;
  public emailID !:any;
  constructor(private fb: FormBuilder,
    private stripeService: StripeService, private checkoutService: CheckoutService,  private cartService: Cart2Service, private router: Router) { }
    public amt!: number;
  ngOnInit(): void {
    this.emailID = localStorage.getItem("UserEmailID");
    this.getProducts();
    this.loading = false;
    this.createForm();

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#stripeCard');
        }
      });
  }

 
  getProducts()
  {
    this.cartService.getProducts(this.emailID).subscribe(
  
        (data)=>{
          console.log(data);
          this.products=data;
        },
        (err)=>{
          console.log(err);
        }
    )
  }
  grandTotalcost():number
  {
     this.grandTotal =0;
    var len = this.products.length;
    console.log("length of cartProducts is: "+len);
    for( var i=0;i<len;i++)
    {
      console.log("cart products cost is: "+ this.products[i].cost);
     this.grandTotal += this.products[i].cost * this.products[i].quantity;
    }
    console.log("Total is: "+this.grandTotal);
    return this.grandTotal;
  }
  createForm(){
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })
  }
  emptyCart()
{
    this.cartService.emptyCart(this.emailID).subscribe(
      (data)=>{
        // alert("Cart Emptied!");
        this.getProducts();
      },(err)=>{
        console.log(err);
      }
    )
}


  buy(){
    const name = this.stripeForm.value.name;
    this.stripeForm.value.amount = this.grandTotalcost();
    const amount = this.stripeForm.value.amount;
    this.submitted = false;
    this.loading = true;
    this.stripeData = this.stripeForm.value;
    console.log(this.stripeData);

    this.stripeService
    .createToken(this.card, {name})
    .subscribe(result => {
      if(result.token){
        this.stripeData['token'] = result.token;

        this.checkoutService.stripePayment(this.stripeData).subscribe((res: any) => {
          if(res['success']){
            this.loading = false;
            this.submitted = true;
            this.paymentStatus = res['status'];
            console.log("payment successful");
            alert("Payment successful!");

          }else{
            this.loading = false;
            this.submitted = false;
            this.paymentStatus = res['status'];
            console.log("payment unsuccessful");

          }
        })
      }else if(result.error){
        this.paymentStatus = result.error.message;
      }
    });
  }

orders()
{
   this.cartService.deleteAllItems(this.emailID).subscribe(
     (data)=>{
      this.router.navigate(['home']);
       console.log("cart data deleted successfully for orders")
     },
     (err)=>{
       console.log("this.emailId is :"+this.emailID);
       console.log("error occured while deleting cart for orders");
     }
   )
}


}

