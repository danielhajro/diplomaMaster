import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cars } from 'src/app/interfaces/cars';
import { AuthService } from 'src/app/services/auth.service';
import { CarCrudService } from 'src/app/services/car-crud.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent {
  addNewCarForm!:FormGroup;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private carCrud:CarCrudService,
    private router: Router,
    private authService:AuthService
  ){
    this.addNewCarForm=this.fb.group({
      mileage: ['',[Validators.required]],
      make: ['',[Validators.required]],
      model: ['',[Validators.required]],
      fuel: ['',[Validators.required]],
      gear: ['',[Validators.required]],
      offer_type: ['',[Validators.required]],
      price: ['',[Validators.required, Validators.min(0)]], 
      hp: ['',[Validators.required, Validators.min(1), Validators.max(9999)]], 
      year: ['',[Validators.required, Validators.min(1970), Validators.max(this.currentYear)]] 
    })
  }

  onSubmit(): void {
    if (this.addNewCarForm.invalid) {
      return;
    }
  
    const carData: Cars = {
      ...this.addNewCarForm.value
    };
  
    const person_id = this.authService.getPersonId(); 
    if (person_id) { 
      this.carCrud.addCar(carData,person_id).subscribe(
        response => {
          console.log('Car added successfully', response);
          this.router.navigate(['/cars']); 
        }, 
        error => {
          console.log('Error adding car', error);
        }
      );
    } else {
      console.error('Person ID not found');
    }
  }
}
