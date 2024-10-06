import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../interfaces/review';
import { ReviewCrudService } from 'src/app/services/review-crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  editReviewForm: FormGroup;
  review: Review | undefined;
  review_id: number | undefined;
  rating: number = 0; // The rating selected by the user

  constructor(
    private reviewCrud: ReviewCrudService,
    public router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editReviewForm = this.fb.group({
      rating: [0, [Validators.required]], // Initialize with 0
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const person_id = this.auth.getPersonId();
    if (person_id) {
      const review_id = Number(this.route.snapshot.paramMap.get('review_id'));
      if (review_id) {
        this.review_id = review_id; // Assign review_id here
        this.loadReviewInfo(review_id); 
      } else {
        console.error("No review ID found.");
        this.router.navigate(['/review']);
      }
    } else {
      console.error("Can't find a person id.");
      this.router.navigate(['/login']);
    }
  }
  

  loadReviewInfo(review_id: number): void {
    this.reviewCrud.getReviewById(review_id).subscribe(
      (review) => {
        this.review = review;
        this.rating = review.rating; // Set the initial rating
        this.editReviewForm.patchValue({
          rating: review.rating,
          content: review.content
        });
      },
      (error) => {
        console.error("Error loading review infos: ", error);
      }
    );
  }

  rate(stars: number): void {
    this.rating = stars; // Update the rating when the user clicks a star
    this.editReviewForm.patchValue({ rating: this.rating }); // Update the form control with the selected rating
  }

  onSubmit(): void {
    if (this.editReviewForm.invalid || !this.review_id) {
      return;
    }

    const person_id = this.auth.getPersonId();
    const reviewData: Review = {
      ...this.editReviewForm.value
    };

    if (person_id && this.review_id) {
      this.reviewCrud.updateReview(this.review_id, reviewData).subscribe(
        (response) => {
          console.log('Review edited: ', response);
          this.router.navigate(['/reviews']);
        },
        (error) => {
          console.log('Error updating review', error);
        }
      );
    } else {
      console.error("Error finding person id or review id");
    }
  }
}
