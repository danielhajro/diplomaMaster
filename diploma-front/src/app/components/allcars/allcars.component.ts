import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from 'src/app/interfaces/cars';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.css']
})
export class AllcarsComponent {
  cars: Cars[] = [];
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
            this.getAllCars();
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

  getAllCars():any{
    this.userCrud.getAllCars().subscribe(
      response =>{
        this.cars=response;
      }, error =>{
        console.error("Cant find cars: " ,error);
      }
    )
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
  
}
