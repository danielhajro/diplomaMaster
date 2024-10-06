import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewCrudService } from 'src/app/services/review-crud.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{
  reviews: Review[]=[];

  constructor(
    private reviewCrud:ReviewCrudService,
    public router:Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
      const person_id = this.authService.getPersonId();
      if(person_id){
        this.loadPersonReviews(person_id);
      }else{
        console.error("User not found:");
        this.router.navigate(['/login']);
      }
  }

  loadPersonReviews(person_id:number):void{
    this.reviewCrud.getPersonReviews(person_id).subscribe(
      reviews=>{
        this.reviews=reviews;
      }, error =>{
        console.log("Error fetching reviews: " , error);
      }
    )
  }

  deleteReview(review_id:number):void{
    this.reviewCrud.deleteReview(review_id).subscribe(
      response =>{
        console.log("Review Deleted : " ,response);
      },error =>{
        console.error("Review Cant be Deleted: ", error);
      }
    )
  }

}
