import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-allreviews',
  templateUrl: './allreviews.component.html',
  styleUrls: ['./allreviews.component.css']
})
export class AllreviewsComponent {
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

  getPostDetails(post:any):{label:string; value:string}[]{
    return [
      {label: 'Title', value:post?.title},
      {label: 'Content', value:post?.content}
    ]
  }
}
