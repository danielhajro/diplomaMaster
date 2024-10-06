import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarCrudService } from '../../services/car-crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Cars } from 'src/app/interfaces/cars';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car: Cars | undefined;
  updateCarForm: FormGroup;
  currentYear = new Date().getFullYear();
  carId: number | undefined;

  constructor(
    private carCrud: CarCrudService,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute // To get the car_id from the route
  ) {
    this.updateCarForm = this.fb.group({
      mileage: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      fuel: ['', [Validators.required]],
      gear: ['', [Validators.required]],
      offer_type: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      hp: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      year: ['', [Validators.required, Validators.min(1970), Validators.max(this.currentYear)]]
    });
  }

  ngOnInit(): void {
    const person_id = this.auth.getPersonId();
    if (person_id) {
      this.route.paramMap.subscribe(params => {
        const carIdParam = params.get('car_id');
        if (carIdParam) {
          this.carId = +carIdParam;
          this.loadCarInfo(this.carId);
        }
      });
    } else {
      console.error('Person Id not found');
      this.router.navigate(['/login']);
    }
  }

  loadCarInfo(car_id: number): void {
    this.carCrud.getCarById(car_id).subscribe((car) => {
      this.car = car;
      this.updateCarForm.patchValue({
        mileage: car.mileage,
        make: car.make,
        model: car.model,
        fuel: car.fuel,
        gear: car.gear,
        offer_type: car.offer_type,
        price: car.price,
        hp: car.hp,
        year: car.year
      });
    }, error => {
      console.error('Error loading car information', error);
    });
  }

  onSubmit(): void {
    if (this.updateCarForm.valid && this.carId) {
      const updatedCarData: Cars = this.updateCarForm.value;
      this.carCrud.updateCar(this.carId, updatedCarData).subscribe(
        (response: string) => {
          console.log('Car updated successfully:', response);
          this.router.navigate(['/cars']); // Redirect to the car list or another page after success
        },
        (error) => {
          console.error('Error updating car:', error);
        }
      );
    }
  }
}
