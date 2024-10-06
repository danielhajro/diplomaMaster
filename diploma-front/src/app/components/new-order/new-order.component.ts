import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderCrudService } from 'src/app/services/order-crud.service';
import { PostCrudService } from 'src/app/services/post-crud.service';
import { Post } from 'src/app/interfaces/post'; // Import Post interface

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  addOrderForm!: FormGroup;
  postDetails: Post | null = null; // Variable to store post details
  post_id: number | undefined;

  constructor(
    private orderCrud: OrderCrudService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postCrud: PostCrudService
  ) {
    this.addOrderForm = this.fb.group({
      order_date: ['', [Validators.required]],
      person_id: ['', [Validators.required]],
      post_id: ['', [Validators.required]],
      seller_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      payment_type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    this.post_id = Number(this.route.snapshot.paramMap.get('post_id'));

    if (person_id && this.post_id) {
      // Fetch post details to display to the user
      this.fetchPostDetails(this.post_id);
      
      // Set initial form values
      this.addOrderForm.patchValue({
        order_date: new Date().toISOString().slice(0, 19), // Set current date
        person_id: person_id,
        post_id: this.post_id,
        status: 'Pending' // Set status to "Pending"
      });
    } else {
      console.error('Cannot find person ID or post ID');
      this.router.navigate(['/login']);
    }
  }

  // New method to fetch post details
  fetchPostDetails(post_id: number): void {
    this.postCrud.getPostById(post_id).subscribe(
      (post) => {
        this.postDetails = post; // Store post details in the component variable
        this.addOrderForm.patchValue({
          seller_id: post.seller_id // Set seller_id based on fetched post data
        });
      },
      (error) => {
        console.error('Error fetching post data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addOrderForm.invalid) {
      return;
    }

    const orderData: Order = {
      ...this.addOrderForm.value,
    };

    this.orderCrud.addOrder(orderData.person_id!, orderData.post_id!, orderData).subscribe(
      response => {
        console.log('Order placed successfully:', response);
        this.router.navigate(['/orders']); // Redirect after successful order placement
      },
      error => {
        console.error("Can't place order:", error);
      }
    );
  }
}
