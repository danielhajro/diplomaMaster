import { Component, OnInit } from '@angular/core';
import { UserCrudsService } from '../../services/user-cruds.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Cars } from 'src/app/interfaces/cars';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  person: any;
  cars:Cars[]= [];
  recentPost:Post[]=[];

  constructor(
    private usercrud: UserCrudsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.loadUserInfo(person_id);
      this.loadUserCars(person_id);
      this.loadRecentPost(person_id);
      
    } else {
      console.error('Person ID not found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }
  

  loadUserInfo(person_id: number): void {
    this.usercrud.getPersonInfo(person_id).subscribe(
      data => {
        this.person = data; 
      },
      error => {
        console.error('Error loading user information:', error);
      }
    );
  }

  loadUserCars(person_id:number):void{
    this.usercrud.getPersonCars(person_id).subscribe(
      data=>{
        this.cars=data;
      }, error=>{
      console.error('Error loading cars:', error);
    })
  }

  loadRecentPost(person_id:number):void{
    this.usercrud.getRecentPost(person_id).subscribe(
      data=>{
        this.recentPost=data;
      }, error=>{
        console.log('Error loading cars' , error);
      }
    )
  }
  

}
