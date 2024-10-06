import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Person } from '../interfaces/person';
import { Cars } from '../interfaces/cars';
import { Post } from '../interfaces/post';
import { Order } from '../interfaces/order';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class UserCrudsService {

  private apiUrl='http://localhost:8080/user';
  private adminUrl='http://localhost:8080/admin';
  constructor(private http:HttpClient) { }

  addPerson(personData: Person): Observable<string> {
    return this.http.post(`${this.apiUrl}/addPerson`, personData, { responseType: 'text' });
  }

  updatePerson(person_id: number, personData: Person): Observable<string> {
    return this.http.put(`${this.apiUrl}/updateUser/${person_id}`, personData, { responseType: 'text' });
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }
  
  getPersonInfo(person_id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/personInfo/${person_id}`);
  }

  getPersonCars(person_id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/userCars/${person_id}`);
  }

  getRecentPost(person_id:number):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/recentPost/${person_id}`).pipe(
      map(posts => posts.map(post => ({
        ...post,
        car_id:post.car_id?.car_id
      })))
    );
  }

  getPersonById(person_id:number):Observable<Person>{
    return this.http.get<Person>(`${this.apiUrl}/getPersonInfo/${person_id}`);
  }

  getPersonBySellerId(seller_id:number):Observable<any>{
    return this.http.get<Person>(`${this.apiUrl}/getPerson/${seller_id}`);
  }

  deleteUser(person_id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteUser/${person_id}`);
  }


  //Admin Fuctions 

  getRole(person_id: number): Observable<string> {
    return this.http.get(`${this.adminUrl}/getRole/${person_id}`, { responseType: 'text' });
  }
  
  getAllUsers():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.adminUrl}/allUsers`);
  }

  getAllCars():Observable<Cars[]>{
    return this.http.get<Cars[]>(`${this.adminUrl}/cars`);
  }

  getAllPost():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.adminUrl}/allPost`);
  }

  getAllOrder():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.adminUrl}/orders`);
  }

  getAllReview():Observable<Review[]>{
    return this.http.get<Review[]>(`${this.adminUrl}/allReviews`);
  }

  addAdmin(personData: Person): Observable<string> {
    return this.http.post(`${this.adminUrl}/addPerson`, personData, { responseType: 'text' });
  }
}
