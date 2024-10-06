import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { PostCrudService } from 'src/app/services/post-crud.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { WishlistCrudService } from 'src/app/services/wishlist-crud.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  posts: Post[] = [];
  otherPost:Post[]=[];

  constructor(
    private postCrud: PostCrudService,
    private router: Router,
    private authService: AuthService,
    private wishCrud:WishlistCrudService
  ) {}

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.authService.getSellerId().subscribe(
        (seller_id: number | null) => {
          if (seller_id) {
            this.loadSellerPosts(seller_id);
            this.loadOtherPost(seller_id);
          } else {
            console.error("Seller ID not found.");
          }
        },
        (error) => {
          console.error("Error retrieving seller ID:", error);
        }
      );
    } else {
      console.error("Person Id not found.");
      this.router.navigate(['/login']);
    }
  }

  loadSellerPosts(seller_id: number): void {
    this.postCrud.getSellerIdPost(seller_id).subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.error("Error loading posts:", error);
      }
    );
  }

  loadOtherPost(seller_id:number):void{
    this.postCrud.getOtherPosts(seller_id).subscribe(
      (otherPost) =>{
        this.otherPost=otherPost;
      }, error=>{
        console.error("Error loading posts " , error);
      }
    );
  }

  editPost(post_id: number | undefined): void {
    if (post_id !== undefined) {
      this.router.navigate(['/edit-post', post_id]);
    }
  }

  deletePost(post_id: number | undefined): void {
    if (post_id !== undefined) {
      this.postCrud.deletePost(post_id).subscribe(
        (response: string) => {
          console.log("Post Deleted : ", response);
          this.router.navigate(["/post"]);
        }, error => {
          console.error("Cant delete post: ", error);
        }
      );
    }
  }

  placeOrder(post_id: number | undefined): void {
    if (post_id) {
      this.router.navigate(['/new-order', post_id]);
    } else {
      console.error('Post ID is undefined');
    }
  }

  newReview(post_id:number | undefined):void{
    if(post_id !== undefined){
      this.router.navigate(['/new-review', post_id]);
    }else{
      console.error("Cant find post Id");
    }
  }

  addToWishlist(post_id: number | undefined): void {
    const person_id = this.authService.getPersonId();
    
    if (person_id && post_id!==undefined) {
      const wishlistData: Wishlist = {
        person_id: person_id,
        post_id: post_id
      };

      this.wishCrud.addWishlist(person_id, post_id, wishlistData).subscribe(
        response => {
          console.log("Wishlist added: ", response);
          this.router.navigate(['/wishlist']);
        },
        error => {
          console.error("Error adding wishlist: ", error);
        }
      );
    } else {
      console.log("Can't find person id or post id");
    }
  }
  
  
}
