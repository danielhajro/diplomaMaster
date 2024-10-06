import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class PostCrudService {
  private apiUrl='http://localhost:8080/user';
  constructor(private http:HttpClient) { }

  addPost(person_id:number,car_id:number,postData:Post):Observable<string>{
    return this.http.post(`${this.apiUrl}/newPost/${person_id}/${car_id}`, postData,{responseType:'text'});
  }

  updatePost(post_id:number, postData:Post):Observable<string>{
    return this.http.put(`${this.apiUrl}/updatePost/${post_id}`,postData,{responseType:'text'});
  }

  deletePost(post_id:number):Observable<string>{
    return this.http.delete(`${this.apiUrl}/deletePost/${post_id}`, {responseType:"text"});
  }

  getSellerIdPost(seller_id:number):Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiUrl}/userPost/${seller_id}`);
  }

  getOtherPosts(seller_id:number):Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiUrl}/otherPost/${seller_id}`)
  }

  getPostById(post_id:number):Observable<Post>{
    return this.http.get<Post>(`${this.apiUrl}/getPost/${post_id}`);
  }

  getPostReviews(post_id:number):Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiUrl}/getPostReviews/${post_id}`)
  }
}
