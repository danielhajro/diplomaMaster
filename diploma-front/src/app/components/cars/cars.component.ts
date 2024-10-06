import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from 'src/app/interfaces/cars';
import { AuthService } from 'src/app/services/auth.service';
import { CarCrudService } from 'src/app/services/car-crud.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars:Cars[]=[];

  constructor(
    private usercrud:UserCrudsService,
    private router:Router,
    private authService:AuthService,
    private carCrud:CarCrudService
  ){}

  ngOnInit(): void {
      const person_id=this.authService.getPersonId();
      if(person_id){  
        this.loadCars(person_id);
      }else{
        console.error('Person ID not found. Redirecting');
        this.router.navigate(['/login']);
      }
  }

  loadCars(person_id:number):void{
    this.usercrud.getPersonCars(person_id).subscribe(
      data=>{
        this.cars=data;
      }, error=>{
        console.log('Error loading cars',error);
      }
    )
  }

  editCar(car_id:number):void{
    this.router.navigate(['edit-car', car_id]);
  }

  deleteCar(car_id: number): void {
    this.carCrud.deleteCar(car_id).subscribe(
      (response: string) => {
        console.log('Car deleted successfully:', response);
        this.router.navigate(['/cars']);
      },
      (error) => {
        console.error('Error deleting car:', error);
      }
    );
  }
}
