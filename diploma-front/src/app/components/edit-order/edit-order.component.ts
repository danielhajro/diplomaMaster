import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderCrudService } from 'src/app/services/order-crud.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit{
  editOrderForm:FormGroup;
  order: Order | undefined;
  order_id:number | undefined;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private auth: AuthService,
    private route:ActivatedRoute,
    private orderCrud:OrderCrudService
  ){
    this.editOrderForm=this.fb.group({
      order_date: ['', [Validators.required]],
      person_id: ['', [Validators.required]],
      post_id: ['', [Validators.required]],
      seller_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      payment_type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      const person_id= this.auth.getPersonId();
      if(person_id){
       this.order_id= Number(this.route.snapshot.paramMap.get('order_id'));
       this.loadOrderInfo(this.order_id);
      }else{
        console.error("Cant Find Person Id");
        this.router.navigate(['/login']);
      }
  }

  loadOrderInfo(order_id:number):void{
    this.orderCrud.getOrderById(order_id).subscribe(
      (order)=>{
        this.order=order;
        this.editOrderForm.patchValue({
          order_date:order.order_date,
          person_id:order.person_id,
          post_id:order.post_id,
          seller_id:order.seller_id,
          status:order.status,
          payment_type:order.payment_type
        })
        console.log(order);
      }
    );
  }

  onSubmit(): void {
    if (this.editOrderForm.invalid || typeof this.order_id !== 'number') {
      return;
    }
  
    const order_date = new Date().toISOString().slice(0, 19);
  
    const updateOrderData: Order = {
      ...this.editOrderForm.value,
      order_date: order_date
    };
  
    const person_id = this.auth.getPersonId();
    if(person_id){
    this.auth.getSellerId().subscribe(
      (sellerIdValue: number | null) => {
        if (sellerIdValue !== null && sellerIdValue !== undefined) {
          this.orderCrud.updateOrder(this.order_id as number, updateOrderData).subscribe(
            response => {
              console.log("Order Updated", response);
              this.router.navigate(['/orders']);
            },
            error => {
              console.error("Error Updating Order: ", error);
            }
          );
        } else {
          console.error("Seller Id not found");
        }
      }
    );
  }else{
    console.error("Cant Find Person Id");
    this.router.navigate(['/login']);
  }
}

}
