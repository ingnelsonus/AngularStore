import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from 'src/app/pages/products/interface/product.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/Interfaces/stores.interface';
import {DataService} from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

model ={
  name:'faneuscode',
  store:'',
  shippingAddress:'',
  city:''
};

isDelivery:boolean=true;
cart:Product[] =[];
stores:Store[]=[];

  constructor(
    private dataSvc:DataService,
    private ShoppingCartSvc:ShoppingCartService,
    private router:Router,
    private productSvc :ProductsService
    ) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value:boolean):void{
    this.isDelivery=value;
  }

  onSubmit({value:formData}:NgForm):void{
    console.log('Guardar',formData);
    const dataOrder:Order ={
      ...formData,
      dte:this.getCurrentDate(),
      isDelivery:this.isDelivery
    }
    this.dataSvc.saveOrder(dataOrder)
    .pipe(
      tap(res =>console.log('Order ->',res)),
      switchMap(({id:orderId})=>{
        const details =this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({details,orderId});
      }),
      tap(() =>this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(()=>this.ShoppingCartSvc.resetCart())
    ).subscribe();
  }

  private getStores():void{
    this.dataSvc.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores=stores)
    )
    .subscribe()
  }

  private getCurrentDate():string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(){

    const details:Details[]=[];
    this.cart.forEach((product:Product) =>{
      const {id:productId,name:productName,qty:quantity,stock}=product
      const updateStock = (stock-quantity);

      this.productSvc.updateStock(productId,updateStock)
      .pipe(
        tap(()=>details.push({productId,productName,quantity}))
      )
      .subscribe();

    })
    return details;
  }

  private getDataCart():void{
    this.ShoppingCartSvc.cartAction$
    .pipe(
      tap((products:Product[])=>this.cart=products)
    )
    .subscribe()
  }

}
