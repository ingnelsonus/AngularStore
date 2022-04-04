import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../interfaces/stores.interface';
import { Details, DetailsOrder, Order, } from '../interfaces/order.interface';

@Injectable({
  providedIn:'root'
})

export class DataService{

  private apiURL='http://localhost:3001';

  constructor(private http:HttpClient){}

  getStores():Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiURL}/stores`)
  }

  saveOrder(order:Order):Observable<Order>{
    return this.http.post<any>(`${this.apiURL}/orders`,order);
  }

saveDetailsOrder(details:DetailsOrder):Observable<DetailsOrder>{
  return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`,details)
}

}
