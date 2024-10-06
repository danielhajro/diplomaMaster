import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewCrudService {
  private apiUrl='http://localhost:8080/user';
  constructor(private http:HttpClient) { }

  addReview(person_id:number,post_id:number,reviewData:Review):Observable<string>{
    return this.http.post(`${this.apiUrl}/newReview/${person_id}/${post_id}`, reviewData,{responseType:"text"});
  }

  updateReview(review_id:number,reviewData:Review):Observable<string>{
    return this.http.put(`${this.apiUrl}/updateReview/${review_id}`, reviewData,{responseType:"text"});
  }

  deleteReview(review_id:number):Observable<string>{
    return this.http.delete(`${this.apiUrl}/deleteReview/${review_id}`,{responseType:"text"});
  }

  getReviewById(review_id:number):Observable<Review>{
    return this.http.get<Review>(`${this.apiUrl}/review/${review_id}`);
  }

  getPersonReviews(person_id:number):Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiUrl}/userReview/${person_id}`);
  }


}
