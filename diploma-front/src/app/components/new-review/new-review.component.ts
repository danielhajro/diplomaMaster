import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewCrudService } from 'src/app/services/review-crud.service';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
  addReviewForm: FormGroup;
  rating: number = 0; // The rating selected by the user

  constructor(
    private reviewCrud: ReviewCrudService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.addReviewForm = this.fb.group({
      rating: [this.rating, [Validators.required]], // Bind rating to the form control
      content: ['', [Validators.required]],
      person_id: [''],
      post_id: ['']
    });
  }

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.addReviewForm.patchValue({ person_id });
      const post_id = Number(this.route.snapshot.paramMap.get('post_id'));
      this.addReviewForm.patchValue({ post_id });
    } else {
      console.error("Can't find Person Id");
      this.router.navigate(['/login']);
    }
  }

  rate(stars: number): void {
    this.rating = stars; // Update the rating when the user clicks a star
    this.addReviewForm.patchValue({ rating: this.rating }); // Update the form control with the selected rating
  }

  onSubmit(): void {
    if (this.addReviewForm.invalid) {
      return;
    }

    const reviewData: Review = {
      ...this.addReviewForm.value
    };

    this.reviewCrud.addReview(this.addReviewForm.value.person_id, this.addReviewForm.value.post_id, reviewData).subscribe(
      response => {
        console.log("Review added successfully", response);
      }, error => {
        console.error("Can't create Review: ", error);
      }
    );
  }
}
