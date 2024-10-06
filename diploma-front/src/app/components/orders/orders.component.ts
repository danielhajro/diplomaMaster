import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderCrudService } from '../../services/order-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { UserCrudsService } from 'src/app/services/user-cruds.service';
import { PostCrudService } from 'src/app/services/post-crud.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  requests: Order[] = [];
  buyerDetails: { [key: number]: any } = {}; // Store buyer details
  postDetails: { [key: number]: any } = {}; // Store post details

  constructor(
    private orderCrud: OrderCrudService,
    private router: Router,
    private authService: AuthService,
    private userCrud:UserCrudsService,
    private postCrud:PostCrudService
  ) {}

  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id) {
      this.loadUserOrders(person_id);
      this.authService.getSellerId().subscribe(
        (sellerIdValue: number | null) => {
          if (sellerIdValue) {
            this.loadUserRequests(sellerIdValue);
          }
        },
        (error) => {
          console.error('Error fetching Seller ID', error);
        }
      );
    } else {
      console.error("Person ID not found.");
      this.router.navigate(["/login"]);
    }
  }

  loadUserOrders(person_id: number): void {
    this.orderCrud.getUserOrder(person_id).subscribe(
      (orderData: Order[]) => {
        this.orders = orderData;
        this.orders.forEach(o => {
          if (o.person_id) {
            this.userCrud.getPersonById(o.person_id).subscribe(person => {
              if(o.person_id!==undefined)
              this.buyerDetails[o.person_id] = person; // Store the buyer details
            });
          }
          if (o.post_id) {
            this.postCrud.getPostById(o.post_id).subscribe(post => {
              if(o.post_id!==undefined)
              this.postDetails[o.post_id] = post; // Store the post details
            });
          }
        });
      },
      (error) => {
        console.error('Error loading Orders', error);
      }
    );
  }
  
  loadUserRequests(seller_id: number): void {
    this.orderCrud.getUserRequests(seller_id).subscribe(
      (requestsData: Order[]) => {
        this.requests = requestsData;
        this.requests.forEach(r => {
          if (r.person_id) {
            this.userCrud.getPersonById(r.person_id).subscribe(person => {
              if(r.person_id!==undefined)
              this.buyerDetails[r.person_id] = person; // Store the buyer details
            });
          }
          if (r.post_id) {
            this.postCrud.getPostById(r.post_id).subscribe(post => {
              if(r.post_id!==undefined)
              this.postDetails[r.post_id] = post; // Store the post details
            });
          }
        });
      },
      (error) => {
        console.error('Error loading Requests', error);
      }
    );
  }
  

  acceptOrder(order_id: number, post_id: number): void {
    this.orderCrud.acceptOrder(order_id).subscribe(
      response => {
        console.log('Order accepted:', response);
        this.updateRequests(post_id); // Reload requests to reflect the changes
      },
      error => {
        console.error('Error accepting order:', error);
      }
    );
  }

  refuseOrder(order_id: number, post_id: number): void {
    this.orderCrud.refuseOrder(order_id).subscribe(
      response => {
        console.log('Order refused:', response);
        this.updateRequests(post_id); // Reload requests to reflect the changes
      },
      error => {
        console.error('Error refusing order:', error);
      }
    );
  }

  updateRequests(post_id: number): void {
    // Reload the requests for the post to reflect updated statuses
    this.authService.getSellerId().subscribe(
      (seller_id:number | null)=>{
        if(seller_id){
          this.orderCrud.getUserRequests(seller_id).subscribe(
            (updatedRequests: Order[]) => {
              this.requests = updatedRequests.filter(request => request.post_id === post_id);
            },
            (error) => {
              console.error('Error updating requests:', error);
            }
          );
        }
      }
    )
  }

  getPersonDetails(person_id:number): { label: string; value: string }[] {
    const person=this.buyerDetails[person_id];
    if (this.buyerDetails[person_id]) {
      return person ? [
        { label: 'Name', value: person.name },
        { label: 'Phone Number', value: person.number },
        { label: 'Email', value: person.email },
        { label: 'State', value: person.state },
        { label: 'Address', value: person.address }
      ] : [];
    } else {
      console.log(`Buyer details not found for person_id: ${person_id}`);
      return [];
    }
    
  }

  getPostDetails(post_id: number): { label: string; value: string }[] {
    const post = this.postDetails[post_id];
    return post ? [
      { label: 'Title', value: post.title },
      { label: 'Description', value: post.content },
      { label: 'Price', value: post.sell_price?.toString() },
    ] : [];
  }
}

