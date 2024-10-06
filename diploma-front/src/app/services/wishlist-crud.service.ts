import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistCrudService {

  private apiUrl='http://localhost:8080/user';
  constructor(private http:HttpClient) { }

  addWishlist(person_id:number,post_id:number,wishlistData:Wishlist):Observable<string>{
    return this.http.post(`${this.apiUrl}/addWishlist/${person_id}/${post_id}`,wishlistData, {responseType:"text"});
  }

  deleteWishlist(wishlist_id:number):Observable<string>{
    return this.http.delete(`${this.apiUrl}/deleteWishlist/${wishlist_id}`,{responseType:"text"});
  }

  getPersonWishlist(person_id:number):Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(`${this.apiUrl}/userWishlist/${person_id}`);
  }

}
