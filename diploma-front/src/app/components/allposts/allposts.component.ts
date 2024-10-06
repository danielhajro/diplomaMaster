import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { Post } from 'src/app/interfaces/post';
import { Cars } from 'src/app/interfaces/cars';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';
import { CarCrudService } from 'src/app/services/car-crud.service';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css']
})
export class AllpostsComponent implements OnInit {

  post: Post[] = [];
  sellerDetails: { [key: number]: Person } = {};
  carDetails: { [key: number]: Cars } = {}; // Store car details by car_id

  constructor(
    private authService: AuthService,
    private router: Router,
    private userCrud: UserCrudsService,
    private carCrud:CarCrudService
  ) { }

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id !== null) {
      this.userCrud.getRole(person_id).subscribe(
        (roleResponse: string) => {
          const person_role = roleResponse.trim();
          if (person_role === 'ADMIN') {
            this.getAllPost();
          } else {
            console.warn('Access denied. User is not an admin.');
            this.router.navigate(['/login']);
          }
        });
    } else {
      console.error("Person Id not Found");
      this.router.navigate(['/login']);
    }
  }

  getAllPost(): void {
    this.userCrud.getAllPost().subscribe(
      response => {
        this.post = response;
        this.post.forEach(p => {
          if (p.seller_id) {
            this.getSellerDetails(p.seller_id);
          }
          if (p.car_id) {
            this.getCarDetails(p.car_id);
          }
        });
      }, error => {
        console.error("Post can't be found: ", error);
      }
    );
  }

  getSellerDetails(seller_id: number): void {
    if (!this.sellerDetails[seller_id]) {
      this.userCrud.getPersonBySellerId(seller_id).subscribe(person => {
        this.sellerDetails[seller_id] = person;
      });
    }
  }

  getCarDetails(car: any): { label: string; value: string }[] {
    return [
      { label: 'Make', value: car?.make },
      { label: 'Model', value: car?.model },
      { label: 'Year', value: car?.year },
      { label: 'Mileage', value: car?.mileage?.toString() },
      { label: 'Fuel Type', value: car?.fuel },
      { label: 'Gear Type', value: car?.gear },
      { label: 'Price', value: car?.price?.toString() },
      { label: 'HP', value: car?.hp?.toString() }
    ];
  }

  getPersonDetails(person: Person): { label: string; value: string }[] {
    return [
      { label: 'Name', value: person?.name as string},
      { label: 'Surname', value: person?.surname  as string},
      { label: 'Phone Number', value: person?.number  as string},
      { label: 'Email', value: person?.email  as string},
      { label: 'State', value: person?.state as string },
      { label: 'Address', value: person?.address  as string}
    ];
  }
}
