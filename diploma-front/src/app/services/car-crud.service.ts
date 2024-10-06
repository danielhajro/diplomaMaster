import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cars } from '../interfaces/cars';
import { text } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root'
})
export class CarCrudService {
  private apiUrl='http://localhost:8080/user';
  private adminUrl='http://localhost:8080/admin';
  constructor(private http:HttpClient) { }

  deleteCar(car_id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/deleteCar/${car_id}`, { responseType: 'text' });
  }  

  addCar(carData:Cars, person_id:number):Observable<string>{
    return this.http.post(`${this.apiUrl}/addCar/${person_id}`, carData, { responseType:'text'});
  }

  updateCar(car_id:number,carData:Cars): Observable<string>{
    return this.http.put(`${this.apiUrl}/updateCar/${car_id}`, carData,{responseType:'text'});
  }

  getCarById(car_id:number):Observable<Cars>{
    return this.http.get<Cars>(`${this.apiUrl}/userCars/getCarById/${car_id}`);
  }

  getAllCars():Observable<Cars[]>{
    return this.http.get<Cars[]>(`${this.adminUrl}/cars`);
  }

  getCarId(car_id:number):Observable<Cars>{
    return this.http.get<Cars>(`${this.adminUrl}/cars/get_${car_id}`)
  }

}
