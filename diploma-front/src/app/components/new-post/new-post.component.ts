import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostCrudService } from 'src/app/services/post-crud.service';
import { CarCrudService } from 'src/app/services/car-crud.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';
import { Cars } from 'src/app/interfaces/cars';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  addPostForm!: FormGroup;
  cars: Cars[] = [];

  constructor(
    private postCrud: PostCrudService,
    private router: Router,
    private carCruds: CarCrudService,
    private authService: AuthService,
    private fb: FormBuilder,
    private userCruds: UserCrudsService
  ) {
    this.addPostForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      sell_price:['', [Validators.required]],
      car_id: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.loadUserCars(person_id);
    } else {
      console.error("Can't find Person Id");
      this.router.navigate(['/login']);
    }
  }

  loadUserCars(person_id: number): void {
    this.userCruds.getPersonCars(person_id).subscribe(
      data => {
        this.cars = data;
      },
      error => {
        console.error("Can't retrieve cars: ", error);
      }
    );
  }

  onSubmit(): void {
    if (this.addPostForm.invalid) {
      return;
    }

    const person_id = this.authService.getPersonId();
    const car_id = this.addPostForm.value.car_id;

    const postData: Post = {
      ...this.addPostForm.value,
      person_id: person_id,  // Manually add person_id
      timestamp: new Date().toISOString() // Set current timestamp automatically
    };
    if (person_id && car_id) {
      this.postCrud.addPost(person_id, car_id, postData).subscribe(
        response => {
          console.log('Post added successfully,', response);
        },
        error => {
          console.log('Error adding the post', error);
        }
      );
    } else {
      console.error('Error find person ID or car Id.')
    }
  } 
  
}
