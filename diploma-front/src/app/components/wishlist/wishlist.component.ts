import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistCrudService } from 'src/app/services/wishlist-crud.service';
import { PostCrudService } from 'src/app/services/post-crud.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlists: Wishlist[] = [];
  postDetails: { [key: number]: any } = {}; // Object to store post details by post_id

  constructor(
    private wishCrud: WishlistCrudService,
    private postCrud: PostCrudService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.loadPersonWishlists(person_id);
    } else {
      console.error("User not found:");
      this.router.navigate(['/login']);
    }
  }

  loadPersonWishlists(person_id: number): void {
    this.wishCrud.getPersonWishlist(person_id).subscribe(
      (wishlists: Wishlist[]) => {
        this.wishlists = wishlists;
      },
      error => {
        console.error("Error fetching wishlists: ", error);
      }
    );
  }
  
  getPostDetails(post:any) : {label:string,value:string}[]{
    return[
      {label: 'Title', value: post?.title},
      {label: 'Content', value:post?.content}
    ];
  }

  deleteWishlist(wishlist_id: number): void {
    this.wishCrud.deleteWishlist(wishlist_id).subscribe(
      response => {
        console.log("Wishlist Deleted: ", response);
        this.wishlists = this.wishlists.filter(wishlist => wishlist.wishlist_id !== wishlist_id);
      },
      error => {
        console.log("Can't delete wishlist: ", error);
      }
    );
  }

  getPostId(wishlist: any): number {
    // Check if post_id is an object and extract post_id, otherwise return it as a number
    return typeof wishlist.post_id === 'object' && wishlist.post_id !== null 
      ? wishlist.post_id.post_id 
      : wishlist.post_id;
  }
  
}
