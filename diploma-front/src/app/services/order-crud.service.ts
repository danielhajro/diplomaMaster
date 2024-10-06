import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderCrudService {
  private apiUrl='http://localhost:8080/user';
  constructor(private http:HttpClient) { }

  addOrder(person_id:number,post_id:number,OrderForm:Order):Observable<string>{
    return this.http.post(`${this.apiUrl}/newOrder/${person_id}/${post_id}`, OrderForm,{responseType:"text"});
  }

  updateOrder(order_id:number,OrderForm:Order):Observable<string>{
    return this.http.put(`${this.apiUrl}/updateOrder/${order_id}`, OrderForm,{responseType:'text'});
  }

  deleteOrder(order_id:number):Observable<string>{
    return this.http.delete(`${this.apiUrl}/deleteOrder/${order_id}`,{responseType:'text'});
  }

  getUserOrder(personId: number): Observable<Order[]> {
    return this.http.get<any[]>(`${this.apiUrl}/userOrder/${personId}`).pipe(
      map(orders => orders.map(order => ({
        ...order,
        post_id: order.post_id?.post_id, 
        person_id: order.person_id?.person_id 
      })))
    );
  }

  getUserRequests(sellerId: number): Observable<Order[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sellerOrder/${sellerId}`).pipe(
      map(orders => orders.map(order => ({
        ...order,
        post_id: order.post_id?.post_id,  
        person_id: order.person_id?.person_id 
      })))
    );
  }

  getOrderById(order_id:number):Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}/getOrderById/${order_id}`);
  }
  
  acceptOrder(orderId: number): Observable<string> {
    const url = `${this.apiUrl}/${orderId}/accept`;
    return this.http.put(url, {}, { responseType: 'text' });
  }

  refuseOrder(orderId: number): Observable<string> {
    const url = `${this.apiUrl}/${orderId}/refuse`;
    return this.http.put(url, {}, { responseType: 'text' });
  }
}
