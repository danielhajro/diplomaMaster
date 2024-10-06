import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { AuthService } from 'src/app/services/auth.service';
import { UserCrudsService } from 'src/app/services/user-cruds.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit{
  person: Person[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private userCrud: UserCrudsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const person_id = this.authService.getPersonId();
    if (person_id !== null) {
      this.userCrud.getRole(person_id).subscribe(
        (roleResponse: string) => {
          const person_role = roleResponse.trim();
          if (person_role === 'ADMIN') {
            this.getAllUsers();
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

  getAllUsers():any{
    this.userCrud.getAllUsers().subscribe(
      response =>{
        this.person=response;
      }, error=>{
        console.error("Cant find users: " ,error);
      }
    )
  }
}
