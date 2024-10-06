import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { PostCrudService } from '../../services/post-crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editCarForm: FormGroup;
  post: Post | undefined;
  post_id: number | undefined;
  car_id: number | undefined;

  constructor(
    private postCrud: PostCrudService,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editCarForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      sell_price:['', [Validators.required]],
      car_id: ['', [Validators.required]],
      timestamp:['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    const person_id = this.auth.getPersonId();
    if (person_id) {
      this.post_id = Number(this.route.snapshot.paramMap.get('post_id'));
      this.loadPostInfo(this.post_id);
    } else {
      console.error('Person ID not found. Redirecting');
      this.router.navigate(['/login']);
    }
  }

  loadPostInfo(post_id: number): void {
    this.postCrud.getPostById(post_id).subscribe(
      (post) => {
        this.post = post;
        this.editCarForm.patchValue({
          title: post.title,
          content: post.content,
          sell_price: post.sell_price,
          car_id:post.car_id,
          seller_id:post.seller_id,
          timestamp:post.timestamp
        });
      },
      (error) => {
        console.error("Error loading post info: ", error);
      }
    );
  }

  onSubmit(): void {
    if (this.editCarForm.invalid || !this.post_id) {
      return;
    }
  
    const person_id = this.auth.getPersonId();
    const car_id = this.editCarForm.value.car_id?.car_id; 
  
   
    const timestamp = new Date().toISOString().slice(0, 19);
  
    const updatePostData: Post = {
      ...this.editCarForm.value,
      car_id: car_id,          
      timestamp: timestamp,   
      person_id: person_id     
    };
  
    console.log(updatePostData); 
  
    if (person_id && car_id) {
      this.postCrud.updatePost(this.post_id, updatePostData).subscribe(
        response => {
          console.log('Post updated successfully:', response);
          this.router.navigate(['/post']);
        },
        error => {
          console.log('Error updating the post:', error);
        }
      );
    } else {
      console.error('Error finding person ID or car ID.');
    }
  }
}
