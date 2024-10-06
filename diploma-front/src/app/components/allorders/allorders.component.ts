import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Person } from 'src/app/interfaces/person';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  order: Order[] = [];
  sellerDetails: { [key: number]: Person } = {};
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
            this.getAllOrder();
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

  getAllOrder():any{
    this.userCrud.getAllOrder().subscribe(
      response=>{
        this.order=response;
        this.order.forEach(o=>{
          if(o.seller_id){
            this.getSellerDetails(o.seller_id);
          }
        });
      }, error=>{
        console.error("Order cant be found: " , error);
      }
    )
  }

  getSellerDetails(seller_id:number | undefined):void{
    if(seller_id !== undefined){
      if(!this.sellerDetails[seller_id]){
        this.userCrud.getPersonBySellerId(seller_id).subscribe(
          seller=>{
            this.sellerDetails[seller_id]=seller;
          }
        );
      }
    } 
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

  getSellerDetailsValue(seller: any): { label: string; value: string }[] {
    return [
      { label: 'Name', value: seller?.name as string},
      { label: 'Surname', value: seller?.surname  as string},
      { label: 'Phone Number', value: seller?.number  as string},
      { label: 'Email', value: seller?.email  as string},
      { label: 'State', value: seller?.state as string },
      { label: 'Address', value: seller?.address  as string}
    ];
  }
  
  getPostDetails(post: any): { label: string; value: string }[] {
    return [
      { label: 'Title', value: post?.title },
      { label: 'Description', value: post?.content },
      { label: 'Price', value: post?.sell_price?.toString() },
    ];
    
  }
}
