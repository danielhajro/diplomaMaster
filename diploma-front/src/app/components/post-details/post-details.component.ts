import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { PostCrudService } from 'src/app/services/post-crud.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any = null;  // Change the type to 'any' to avoid type checking issues.
  reviews:Review[]=[];
  constructor(
    private postCrud: PostCrudService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      const post_id = Number(this.route.snapshot.paramMap.get("post_id"));
      this.loadPostDetails(post_id);
      this.getPostReviews(post_id);
    } else {
      console.error("Person Id not found.");
      this.router.navigate(['/login']);
    }
  }

  loadPostDetails(post_id: number): void {
    this.postCrud.getPostById(post_id).subscribe(
      (post) => {
        this.post = post;
      },
      (error) => {
        console.error("Error loading post details: ", error);
      }
    );
  }

  placeOrder(post_id: number | undefined): void {
    if (post_id) {
      this.router.navigate(['/new-order', post_id]);
    } else {
      console.error('Post ID is undefined');
    }
  }

  getPostReviews(post_id: number): void {
    if (post_id) {
      this.postCrud.getPostReviews(post_id).subscribe(
        (reviews) => {
          this.reviews = reviews;
          console.log("Fetched Reviews:", this.reviews); // Debugging line
        },
        (error) => {
          console.error("Error finding reviews: ", error);
        }
      );
    } else {
      console.log("Can't find Post Reviews");
    }
  }
  
}
