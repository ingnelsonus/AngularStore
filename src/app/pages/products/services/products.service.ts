import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl='http://localhost:3001/products';
  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  updateStock(productId:number,stock:number):Observable<any>{
    const body ={"stock":stock}
    return this.http.patch<any> (`${this.apiUrl}/${productId}`,body);
  }

}
