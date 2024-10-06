import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/interfaces/cars';
import { Order } from 'src/app/interfaces/order';
import { Person } from 'src/app/interfaces/person';
import { Post } from 'src/app/interfaces/post';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { CarCrudService } from 'src/app/services/car-crud.service';
import { OrderCrudService } from 'src/app/services/order-crud.service';
import { PostCrudService } from 'src/app/services/post-crud.service';
import { ReviewCrudService } from 'src/app/services/review-crud.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  person: Person[] = [];
  cars: Cars[] = [];
  post: Post[] = [];
  order: Order[] = [];
  review: Review[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userCrud: UserCrudsService,
  ) { }

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id !== null) {
      this.userCrud.getRole(person_id).subscribe(
        (roleResponse: string) => {
          const person_role = roleResponse.trim();
          if (person_role === 'ADMIN') {
            this.getAllUsers();
            this.getAllCars();
            this.getAllOrder();
            this.getAllPost();
            this.getAllReview();
          } else {
            console.warn('Access denied. User is not an admin:');
            this.router.navigate(['/login']);
          }
        });
    } else {
      console.error("Person Id not Found");
      this.router.navigate(['/login']);
    }
  }

  getAllUsers():any{
    this.userCrud.getAllUsers().subscribe(
      response =>{
        this.person=response;
      }, error=>{
        console.error("Cant find users: " ,error);
      }
    )
  }

  getAllCars():any{
    this.userCrud.getAllCars().subscribe(
      response =>{
        this.cars=response;
      }, error =>{
        console.error("Cant find cars: " ,error);
      }
    )
  }

  getAllPost():any{
    this.userCrud.getAllPost().subscribe(
      response =>{
        this.post=response;
      }, error =>{
        console.error("Post cant be found: " , error);
      }
    )
  }

  getAllOrder():any{
    this.userCrud.getAllOrder().subscribe(
      response=>{
        this.order=response;
      }, error=>{
        console.error("Order cant be found: " , error);
      }
    )
  }

  getAllReview(): any {
    this.userCrud.getAllReview().subscribe(
      (response: Review[]) => {
        this.review = response;
      },
      error => {
        console.error('Review can\'t be found: ', error);
      }
    );
  }

  getPersonDetails(person: any): { label: string; value: string }[] {
    return [
      { label: 'Name', value: person?.name },
      { label: 'Phone Number', value: person?.number },
      { label: 'Email', value: person?.email },
      { label: 'State', value: person?.state },
      { label: 'Address', value: person?.address }
    ];
  }
}
